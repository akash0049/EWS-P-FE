import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_TableOptions,
} from 'material-react-table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export interface GenericTableProps<TData extends Record<string, any> = Record<string, any>> {
    columns: MRT_ColumnDef<TData>[];
    data: TData[];
    isLoading?: boolean;
    isRefetching?: boolean;
    columnVisibility?: Record<string, boolean>;
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
    columns,
    data,
    isLoading = false,
    isRefetching = false,
    columnVisibility = {},
    options = {},
}: GenericTableProps<TData>) {
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
        /* ── Global search input ── */
        muiSearchTextFieldProps: {
            size: 'small',
            variant: 'outlined',
            placeholder: 'Search…',
            InputProps: {
                sx: {
                    height: '30px',
                    fontSize: 'clamp(9px, 11px, 13px)',
                    fontWeight: 500,
                    borderRadius: '6px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'divider',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#005EEF',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#005EEF',
                        borderWidth: '1.5px',
                    },
                    '& .MuiInputAdornment-root svg': {
                        fontSize: '16px',
                        color: 'text.secondary',
                    },
                },
            },
            inputProps: {
                sx: {
                    py: '4px',
                    fontSize: 'clamp(9px, 11px, 13px)',
                },
            },
        },
        /* ── Column-level filter inputs (text) ── */
        muiFilterTextFieldProps: {
            variant: 'standard',
            sx: {
                /* wrapper input root */
                '& .MuiInputBase-root': {
                    height: '28px',
                    fontSize: 'clamp(9px, 11px, 13px)',
                    fontWeight: 500,
                    borderRadius: '6px',
                },
                /* native <input> inner padding + font */
                '& .MuiInputBase-input': {
                    padding: '3px 8px',
                    fontSize: 'clamp(9px, 11px, 13px)',
                    fontWeight: 500,
                },
                /* default border */
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0,0,0,0.18)',
                },
                /* hover */
                '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#005EEF',
                },
                /* focused */
                '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#005EEF',
                    borderWidth: '1.5px',
                },
                /* clear icon */
                '& .MuiInputAdornment-root svg': {
                    fontSize: '14px',
                    color: 'text.secondary',
                },
            },
        },
        /* ── Column-level filter select (select / multi-select variants) ── */
        muiFilterSelectProps: {
            MenuProps: {
                PaperProps: {
                    elevation: 4,
                    sx: {
                        borderRadius: '6px',
                        mt: '4px',
                    },
                },
                sx: {
                    '& .MuiButtonBase-root': {
                        fontSize: '11px',
                        px: 1.5,
                        py: '6px',
                        minHeight: '28px',
                        lineHeight: 1.4,
                        transition: 'background-color 0.15s',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                        '&.Mui-selected': {
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        },
                        '&.Mui-selected.Mui-focusVisible': {
                            backgroundColor: 'primary.main',
                        },
                    },
                },
            },
            sx: {
                minHeight: '28px',
                fontSize: 'clamp(8px, 10px, 12px)',
                fontWeight: 500,
                borderRadius: '6px',
                '& .MuiSelect-select': {
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontWeight: 500,
                    lineHeight: '22px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    alignItems: 'center',
                },
                '& .MuiChip-root': {
                    height: '18px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(0, 94, 239, 0.1)',
                    color: '#005EEF',
                    margin: 0,
                },
                '& .MuiChip-label': {
                    px: '6px',
                    py: 0,
                    fontWeight: 600,
                },
                '& .MuiChip-deleteIcon': {
                    fontSize: '12px',
                    color: '#005EEF',
                    '&:hover': {
                        color: '#0047B3', // darker shade for hover
                    },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0,0,0,0.18)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#005EEF',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#005EEF',
                    borderWidth: '1.5px',
                },
            },
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
        /* ── Show / Hide columns popover ── */
        muiColumnVisibilityMenuItemProps: {
            sx: {
                fontSize: 'clamp(9px, 11px, 13px)',
                fontWeight: 500,
                py: 0.5,
                minHeight: 'unset',
                '& .MuiSwitch-root': { transform: 'scale(0.8)' },
                '& .MuiSwitch-track': { borderRadius: '10px' },
                '& .MuiSwitch-thumb': { width: '12px', height: '12px' },
                '& .MuiFormControlLabel-label': {
                    fontSize: 'clamp(9px, 11px, 13px)',
                    fontWeight: 500,
                },
                '&:hover': {
                    bgcolor: 'rgba(0,94,239,0.05)',
                    color: '#005EEF',
                },
            },
        },
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

    return <MaterialReactTable table={table} />;
}
