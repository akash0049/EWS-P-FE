import { type MRT_ColumnDef } from "material-react-table";
import {
    Box,
    Typography,
    Chip,
    Tooltip,
    IconButton
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";

export const columns = (tableData: any[], setTableData: (data: any[]) => void): MRT_ColumnDef<any>[] => [
    {
        accessorKey: "objectKey",
        header: "Object Key",
        size: 80,
    },
    {
        accessorKey: "objectName",
        header: "Object Name",
        size: 80,
    },
    {
        accessorKey: "objectPath",
        header: "Object Path",
        size: 80,
        Cell: ({ cell }) => {
            const full = cell.getValue<string>();
            const preview = full.length > 40 ? full.slice(0, 40) + '…' : full;
            return (
                <Tooltip title={full} placement="top" arrow>
                    <Typography
                        sx={{
                            whiteSpace: 'nowrap',
                            cursor: 'default',
                            fontSize: 'clamp(9px, 11px, 13px)',
                            fontWeight: 500
                        }}
                    >
                        {preview}
                    </Typography>
                </Tooltip>
            );
        }
    },
    {
        accessorKey: "metadata",
        header: "Available in Metadata",
        size: 250,
        filterVariant: 'select',
        filterSelectOptions: ['Y', 'N'],
        Cell: ({ row, cell }) => {
            const value = cell.getValue<string>();
            const metadataStatus = row.original.metadataStatus ?? '';
            const preview = metadataStatus.length > 30 ? metadataStatus.slice(0, 30) + '…' : metadataStatus;
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                        label={value}
                        size="small"
                        sx={{
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            borderRadius: "6px",
                            bgcolor: value === "Y" ? "#059669" : "#DC2626",
                            color: "#FFFFFF",
                            border: "none",
                            height: 28,
                            minWidth: 30,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                        }}
                    />
                    <Tooltip title={metadataStatus} placement="top" arrow>
                        <Typography
                            sx={{
                                whiteSpace: 'nowrap',
                                cursor: 'default',
                                fontSize: 'clamp(9px, 11px, 13px)',
                                fontWeight: 500
                            }}
                        >
                            {preview}
                        </Typography>
                    </Tooltip>
                </Box>
            );
        },
    },
    {
        header: "Actions",
        id: "actions",
        size: 100,
        enableSorting: false,
        enableColumnFilter: false,
        enableHiding: false,
        visibleInShowHideMenu: false,
        muiTableHeadCellProps: { align: "center" },
        Cell: ({ row }) =>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                <Tooltip arrow placement="top" title="Delete">
                    <IconButton
                        size="small"
                        onClick={() => {
                            const newData = tableData.filter((item: any) => item.objectKey !== row.original.objectKey);
                            setTableData(newData);
                        }}
                        sx={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            border: '1px solid',
                            borderColor: 'divider',
                            color: '#DC2626',
                            bgcolor: 'rgba(220, 38, 38, 0.04)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: '#DC2626',
                                bgcolor: 'rgba(220, 38, 38, 0.12)',
                            },
                            '& svg': { fontSize: '16px' }
                        }}
                    >
                        <DeleteOutlineOutlined />
                    </IconButton>
                </Tooltip>
            </Box>,
    },
];