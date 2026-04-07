import { useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_TableOptions,
    MRT_ToggleFiltersButton,
    MRT_ShowHideColumnsButton,
    MRT_ToggleFullScreenButton
} from 'material-react-table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Upload } from '@mui/icons-material';
import CustomSearchInput from '../../inputs/search-input/search-input';
import BulkUpload from './bulk-upload';
import './material-table.scss';

export interface GenericTableProps<TData extends Record<string, any> = Record<string, any>> {
    searchPlaceholder: string;
    columns: MRT_ColumnDef<TData>[];
    data: TData[];
    isLoading?: boolean;
    isRefetching?: boolean;
    columnVisibility?: Record<string, boolean>;
    enableBulkUpload?: boolean;
    onBulkUploadSubmit?: (data: Record<string, any>[]) => void;
    /**
     * Optional override or extend of any table options
     */
    options?: Partial<MRT_TableOptions<TData>>;
}

/** Shared small button sx for Previous / Next */
const navBtnSx = (disabled: boolean) => ({
    fontSize: '0.8rem',
    minWidth: 'auto',
    px: 1.5,
    height: '26px',
    borderColor: 'divider',
    color: disabled ? 'text.disabled' : 'text.secondary',
    textTransform: 'none' as const,
    borderRadius: 1.5,
    '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
});

export default function GenericTable<TData extends Record<string, any> = Record<string, any>>({
    searchPlaceholder,
    columns,
    data,
    isLoading = false,
    isRefetching = false,
    columnVisibility = {},
    enableBulkUpload = false,
    onBulkUploadSubmit,
    options = {},
}: GenericTableProps<TData>) {
    const [bulkUploadOpen, setBulkUploadOpen] = useState(false);

    const table = useMaterialReactTable({
        columns,
        data,
        enableDensityToggle: false,
        enableFullScreenToggle: true,
        enableColumnFilters: true,
        enableGlobalFilter: true,
        enableColumnActions: false,
        enableStickyHeader: true,
        paginationDisplayMode: 'pages',
        initialState: {
            columnVisibility,
            density: 'comfortable',
            pagination: { pageSize: 10, pageIndex: 0 },
            ...options.initialState,
        },
        state: {
            isLoading,
            showSkeletons: isLoading,
            showProgressBars: isRefetching,
            ...options.state,
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.02)',
                overflow: 'hidden',
                bgcolor: 'background.paper',
            },
        },
        muiTableContainerProps: {
            sx: { flex: 1, overflow: 'auto' },
        },
        muiTableHeadCellProps: {
            sx: {
                backgroundColor: '#FFFFFF',
                color: '#404040',
                fontSize: 'clamp(10px, 12px, 14px)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
            },
        },
        muiTableBodyRowProps: {
            sx: {
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                },
            },
        },
        muiTableBodyCellProps: {
            sx: {
                fontSize: 'clamp(9px, 11px, 13px)',
                fontWeight: 500,
                borderBottom: '1px solid',
                borderColor: 'divider',
                py: 1.2,
            },
        },
        /* ── Column-level filter inputs (text) ── */
        muiFilterTextFieldProps: {
            variant: 'standard'
        },
        /* ── Column-level filter select (select / multi-select variants) ── */
        muiFilterSelectProps: {
            variant: 'standard'
        },
        /* ── Top toolbar container ── */
        muiTopToolbarProps: {
            sx: {
                '& .MuiInputBase-root': {
                    height: '30px',
                    fontSize: 'clamp(9px, 11px, 13px)',
                    fontWeight: 500,
                    borderRadius: '6px',
                },
                /* Show/Hide columns + filter list icon buttons */
                '& .MuiIconButton-root': {
                    width: '30px',
                    height: '30px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'text.secondary',
                    mr: '4px',
                    '&:hover': {
                        borderColor: '#005EEF',
                        color: '#005EEF',
                        bgcolor: 'rgba(0,94,239,0.05)',
                    },
                    '& svg': { fontSize: '18px' },
                },
            },
        },
        renderToolbarInternalActions: ({ table }) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {enableBulkUpload && onBulkUploadSubmit && (
                    <Tooltip arrow placement="top" title="Bulk Upload">
                        <IconButton onClick={() => setBulkUploadOpen(true)}>
                            <Upload />
                        </IconButton>
                    </Tooltip>
                )}
                <MRT_ToggleFiltersButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <>
                <CustomSearchInput
                    placeholder={searchPlaceholder}
                    value={table.getState().globalFilter ?? ''}
                    onChange={(value) => table.setGlobalFilter(value)}
                />
            </>
        ),
        renderBottomToolbar: ({ table }) => {
            const { pageIndex, pageSize } = table.getState().pagination;
            const totalRows = table.getFilteredRowModel().rows.length;
            const pageCount = table.getPageCount();
            const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
            const to = Math.min((pageIndex + 1) * pageSize, totalRows);

            // Build visible page number array (max 5 centered on current page)
            const maxVisible = 5;
            let start = Math.max(0, pageIndex - Math.floor(maxVisible / 2));
            const end = Math.min(pageCount - 1, start + maxVisible - 1);
            if (end - start < maxVisible - 1) start = Math.max(0, end - maxVisible + 1);
            const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

            const canPrev = table.getCanPreviousPage();
            const canNext = table.getCanNextPage();

            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2,
                        height: '50px',
                        flexShrink: 0,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        borderRadius: '0 0 12px 12px',
                    }}
                >
                    {/* ── Left: Rows per page ── */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', whiteSpace: 'nowrap' }}>
                            Rows per page:
                        </Typography>
                        <Select
                            size="small"
                            value={pageSize}
                            onChange={(e) => table.setPageSize(Number(e.target.value))}
                            sx={{
                                fontSize: '0.8rem',
                                height: '26px',
                                '& .MuiSelect-select': { py: '3px', fontSize: '0.8rem' },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                            }}
                        >
                            {[10, 25, 50].map((size) => (
                                <MenuItem key={size} value={size} sx={{ fontSize: '0.8rem' }}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    {/* ── Center: Showing X to Y of Z ── */}
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500 }}>
                        Showing {from} to {to} of {totalRows} results
                    </Typography>

                    {/* ── Right: Pagination buttons ── */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => table.previousPage()}
                            disabled={!canPrev}
                            sx={navBtnSx(!canPrev)}
                        >
                            Previous
                        </Button>

                        {pages.map((page) => {
                            const isActive = page === pageIndex;
                            return (
                                <Button
                                    key={page}
                                    size="small"
                                    variant={'outlined'}
                                    onClick={() => table.setPageIndex(page)}
                                    sx={{
                                        fontSize: '0.8rem',
                                        minWidth: '26px',
                                        width: '26px',
                                        height: '26px',
                                        p: 0,
                                        borderRadius: 1.5,
                                        backgroundColor: isActive ? '#005EEF' : '#FFFFFF',
                                        borderColor: isActive ? '#005EEF' : 'divider',
                                        color: isActive ? '#FFFFFF' : 'text.secondary',
                                        '&:hover': { borderColor: '#005EEF' },
                                    }}
                                >
                                    {page + 1}
                                </Button>
                            );
                        })}

                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => table.nextPage()}
                            disabled={!canNext}
                            sx={navBtnSx(!canNext)}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            );
        },
        muiToolbarAlertBannerProps: {
            sx: {
                '& .MuiAlert-message': {
                    fontSize: 'clamp(9px, 11px, 13px)',
                    fontWeight: 500,
                },
                '& .MuiChip-label': {
                    fontSize: 'clamp(9px, 11px, 13px)',
                },
                '& .MuiButton-root': {
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    minWidth: 'auto',
                    textTransform: 'none',
                }
            },
        },
        ...options,
    } as MRT_TableOptions<TData>);

    return (
        <>
            <MaterialReactTable table={table} />
            {enableBulkUpload && onBulkUploadSubmit && (
                <BulkUpload
                    open={bulkUploadOpen}
                    onClose={() => setBulkUploadOpen(false)}
                    columns={columns}
                    onSubmit={onBulkUploadSubmit}
                />
            )}
        </>
    );
}
