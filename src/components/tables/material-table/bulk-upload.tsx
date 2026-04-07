import { useState, useCallback, useRef, useMemo } from 'react';
import {
    Box, Typography, Button, Stepper, Step, StepLabel,
    Chip, Alert, Tooltip, Dialog, DialogTitle, DialogContent,
    IconButton, Divider, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
} from '@mui/material';
import {
    CloudUpload, InsertDriveFile, Close, CheckCircle,
    ErrorOutline, ArrowBack,
} from '@mui/icons-material';
import * as XLSX from 'xlsx';
import type { MRT_ColumnDef } from 'material-react-table';

const STEPS = ['Upload File', 'Review & Submit'];
const ACCEPTED_EXTS = ['.xlsx', '.xls', '.csv'];

interface ParsedRow extends Record<string, any> {
    _rowIndex: number;
    _errors: Record<string, string>;
    _hasError: boolean;
}

export interface BulkUploadProps {
    open: boolean;
    onClose: () => void;
    columns: MRT_ColumnDef<any>[];
    onSubmit: (data: Record<string, any>[]) => void;
}

const fmtSize = (b: number) =>
    b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;

const BulkUpload = ({ open, onClose, columns, onSubmit }: BulkUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [step, setStep] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [rows, setRows] = useState<ParsedRow[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dataCols = useMemo(
        () => columns.filter((c: any) => c.accessorKey),
        [columns]
    );

    const mapHeader = useCallback((h: string) => {
        const n = h.toLowerCase().trim();
        for (const c of dataCols) {
            const k = (c as any).accessorKey as string;
            if (n === k.toLowerCase()) return k;
            const hdr = typeof c.header === 'string' ? c.header.toLowerCase().trim() : '';
            if (n === hdr) return k;
        }
        return null;
    }, [dataCols]);

    const validate = useCallback((row: Record<string, any>) => {
        const errs: Record<string, string> = {};
        for (const c of dataCols) {
            const k = (c as any).accessorKey as string;
            const v = row[k];
            if (v === undefined || v === null || String(v).trim() === '') {
                errs[k] = `${typeof c.header === 'string' ? c.header : k} is required`;
                continue;
            }
            if ((c as any).filterSelectOptions) {
                const opts = ((c as any).filterSelectOptions as string[]).map(o => o.toUpperCase());
                if (!opts.includes(String(v).trim().toUpperCase())) {
                    errs[k] = `Must be one of: ${(c as any).filterSelectOptions.join(', ')}`;
                }
            }
        }
        return errs;
    }, [dataCols]);

    const parse = useCallback((f: File) => {
        setError(null);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const wb = XLSX.read(new Uint8Array(e.target?.result as ArrayBuffer), { type: 'array' });
                const json = XLSX.utils.sheet_to_json<Record<string, any>>(wb.Sheets[wb.SheetNames[0]], { defval: '' });
                if (!json.length) { setError('The uploaded file contains no data rows.'); return; }

                const hMap: Record<string, string> = {};
                for (const h of Object.keys(json[0])) { const k = mapHeader(h); if (k) hMap[h] = k; }
                if (!Object.keys(hMap).length) {
                    setError(`No matching columns found. Expected: ${dataCols.map(c => typeof c.header === 'string' ? c.header : (c as any).accessorKey).join(', ')}`);
                    return;
                }

                const parsed: ParsedRow[] = json.map((raw, i) => {
                    const r: Record<string, any> = {};
                    for (const [eh, ak] of Object.entries(hMap)) r[ak] = String(raw[eh] ?? '').trim();
                    const errs = validate(r);
                    return { ...r, _rowIndex: i + 1, _errors: errs, _hasError: Object.keys(errs).length > 0 };
                });
                setRows(parsed);
                setStep(1);
            } catch { setError('Failed to parse file. Ensure it is a valid Excel or CSV file.'); }
        };
        reader.readAsArrayBuffer(f);
    }, [mapHeader, validate, dataCols]);

    const selectFile = useCallback((f: File) => {
        const ext = '.' + (f.name.split('.').pop()?.toLowerCase() ?? '');
        if (!ACCEPTED_EXTS.includes(ext)) { setError(`Unsupported format. Use: ${ACCEPTED_EXTS.join(', ')}`); return; }
        setFile(f);
        parse(f);
    }, [parse]);

    const reset = useCallback(() => { setStep(0); setFile(null); setRows([]); setError(null); }, []);
    const close = useCallback(() => { reset(); onClose(); }, [reset, onClose]);

    const submit = useCallback(() => {
        const clean = rows.filter(r => !r._hasError).map(({ _rowIndex, _errors, _hasError, ...rest }) => rest);
        onSubmit(clean);
        close();
    }, [rows, onSubmit, close]);

    const errCount = rows.filter(r => r._hasError).length;
    const validCount = rows.length - errCount;
    const allValid = errCount === 0 && rows.length > 0;

    return (
        <Dialog
            open={open}
            onClose={(_, reason) => { if (reason !== 'backdropClick') close(); }}
            maxWidth="lg"
            fullWidth
            PaperProps={{ sx: { height: '85vh', borderRadius: 3, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)' } }}
        >
            {/* Header */}
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: 1, px: 3 }}>
                <Box>
                    <Typography variant="subtitle1" fontWeight={800} letterSpacing="-0.5px" color="text.primary">
                        Bulk Upload
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                        Upload objects from an Excel or CSV file
                    </Typography>
                </Box>
                <IconButton onClick={close} size="small" sx={{ color: 'text.secondary', borderRadius: 1.5, '&:hover': { bgcolor: 'action.hover' } }}>
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>
            <Divider sx={{ mx: 1 }} />

            {/* Stepper */}
            <Box sx={{ px: 3, pt: 2, pb: 1 }}>
                <Stepper activeStep={step} alternativeLabel>
                    {STEPS.map(l => (
                        <Step key={l}>
                            <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: 'clamp(10px, 12px, 14px)', fontWeight: 600 } }}>{l}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Content */}
            <DialogContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', px: 3, overflow: 'hidden' }}>
                {step === 0 && (
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        {/* Drop Zone */}
                        <Box
                            onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) selectFile(e.dataTransfer.files[0]); }}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onClick={() => inputRef.current?.click()}
                            sx={{
                                width: '100%', maxWidth: 500, py: 6, px: 4, borderRadius: 3,
                                border: '2px dashed', borderColor: dragOver ? 'primary.main' : 'divider',
                                bgcolor: dragOver ? 'rgba(0,94,239,0.04)' : 'transparent',
                                cursor: 'pointer', transition: 'all 0.25s ease',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                                '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(0,94,239,0.02)' },
                            }}
                        >
                            <CloudUpload sx={{ fontSize: 48, color: dragOver ? 'primary.main' : 'text.disabled', transition: 'color 0.25s' }} />
                            <Box textAlign="center">
                                <Typography variant="body2" fontWeight={600} color="text.primary">Drag & drop your file here</Typography>
                                <Typography variant="caption" color="text.secondary">or click to browse from your computer</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                {ACCEPTED_EXTS.map(ext => (
                                    <Chip key={ext} label={ext} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 24, borderRadius: '6px' }} />
                                ))}
                            </Box>
                            <input ref={inputRef} type="file" hidden accept=".xlsx,.xls,.csv" onChange={(e) => { if (e.target.files?.[0]) selectFile(e.target.files[0]); }} />
                        </Box>

                        {file && !error && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider', maxWidth: 500, width: '100%' }}>
                                <InsertDriveFile sx={{ color: 'primary.main', fontSize: 28 }} />
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="body2" fontWeight={600} noWrap>{file.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">{fmtSize(file.size)}</Typography>
                                </Box>
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); reset(); }}><Close fontSize="small" /></IconButton>
                            </Box>
                        )}
                        {error && <Alert severity="error" sx={{ maxWidth: 500, width: '100%', borderRadius: 2 }}>{error}</Alert>}
                    </Box>
                )}

                {step === 1 && (
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
                        {/* Summary */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            <Chip label={`${rows.length} Total Rows`} size="small" variant="outlined" sx={{ fontWeight: 600, fontSize: '0.75rem', borderRadius: '6px', height: 28 }} />
                            <Chip icon={<CheckCircle />} label={`${validCount} Valid`} size="small"
                                sx={{ fontWeight: 600, fontSize: '0.75rem', borderRadius: '6px', height: 28, bgcolor: 'rgba(5,150,105,0.08)', color: '#059669', border: '1px solid rgba(5,150,105,0.3)', '& .MuiChip-icon': { color: 'inherit', fontSize: 14 } }} />
                            {errCount > 0 && (
                                <Chip icon={<ErrorOutline />} label={`${errCount} Errors`} size="small"
                                    sx={{ fontWeight: 600, fontSize: '0.75rem', borderRadius: '6px', height: 28, bgcolor: 'rgba(220,38,38,0.08)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.3)', '& .MuiChip-icon': { color: 'inherit', fontSize: 14 } }} />
                            )}
                            {file && <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>File: {file.name}</Typography>}
                        </Box>

                        {errCount > 0 && (
                            <Alert severity="warning" sx={{ borderRadius: 2, py: 0, '& .MuiAlert-message': { fontSize: '0.75rem' } }}>
                                Some rows have validation errors. Fix errors in the file and re-upload. Submit is enabled only when all rows are valid.
                            </Alert>
                        )}

                        {/* Review Table */}
                        <TableContainer sx={{ flex: 1, overflow: 'auto', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, fontSize: 'clamp(10px,12px,14px)', textTransform: 'uppercase', letterSpacing: '0.5px', bgcolor: '#FAFAFA', color: '#404040', py: 1.5 }}>#</TableCell>
                                        {dataCols.map((c: any) => (
                                            <TableCell key={c.accessorKey} sx={{ fontWeight: 600, fontSize: 'clamp(10px,12px,14px)', textTransform: 'uppercase', letterSpacing: '0.5px', bgcolor: '#FAFAFA', color: '#404040', py: 1.5 }}>
                                                {typeof c.header === 'string' ? c.header : c.accessorKey}
                                            </TableCell>
                                        ))}
                                        <TableCell align="center" sx={{ fontWeight: 600, fontSize: 'clamp(10px,12px,14px)', textTransform: 'uppercase', letterSpacing: '0.5px', bgcolor: '#FAFAFA', color: '#404040', py: 1.5 }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => (
                                        <TableRow key={row._rowIndex} sx={{
                                            bgcolor: row._hasError ? 'rgba(220,38,38,0.03)' : 'transparent',
                                            '&:hover': { bgcolor: row._hasError ? 'rgba(220,38,38,0.06)' : 'rgba(25,118,210,0.04)' },
                                            transition: 'background 0.2s',
                                        }}>
                                            <TableCell sx={{ fontSize: 'clamp(9px,11px,13px)', fontWeight: 500, py: 1.2 }}>{row._rowIndex}</TableCell>
                                            {dataCols.map((c: any) => {
                                                const err = row._errors[c.accessorKey];
                                                return (
                                                    <TableCell key={c.accessorKey} sx={{ fontSize: 'clamp(9px,11px,13px)', fontWeight: 500, py: 1.2 }}>
                                                        <Tooltip title={err ?? ''} arrow placement="top" disableHoverListener={!err}>
                                                            <Typography component="span" sx={{
                                                                fontSize: 'inherit', fontWeight: 'inherit',
                                                                color: err ? '#DC2626' : 'text.primary',
                                                                borderBottom: err ? '2px dashed #DC2626' : 'none',
                                                                cursor: err ? 'help' : 'default',
                                                            }}>
                                                                {row[c.accessorKey] || '—'}
                                                            </Typography>
                                                        </Tooltip>
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align="center" sx={{ py: 1.2 }}>
                                                <Chip
                                                    icon={row._hasError ? <ErrorOutline /> : <CheckCircle />}
                                                    label={row._hasError ? 'Error' : 'Valid'}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 600, fontSize: '0.7rem', borderRadius: '6px', height: 26,
                                                        bgcolor: row._hasError ? 'rgba(220,38,38,0.08)' : 'rgba(5,150,105,0.08)',
                                                        color: row._hasError ? '#DC2626' : '#059669',
                                                        border: '1px solid',
                                                        borderColor: row._hasError ? 'rgba(220,38,38,0.3)' : 'rgba(5,150,105,0.3)',
                                                        '& .MuiChip-icon': { fontSize: 14, color: 'inherit' },
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </DialogContent>

            {/* Footer Actions */}
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 1.5 }}>
                <Button variant="outlined" color="secondary" startIcon={<ArrowBack fontSize="small" />} onClick={step === 0 ? close : reset} sx={{ height: 35 }}>
                    {step === 0 ? 'Cancel' : 'Back'}
                </Button>
                {step === 1 && (
                    <Button variant="contained" onClick={submit} disabled={!allValid} sx={{ height: 35 }}>
                        Submit ({validCount} rows)
                    </Button>
                )}
            </Box>
        </Dialog>
    );
};

export default BulkUpload;