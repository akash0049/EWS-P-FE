import { type MRT_ColumnDef } from "material-react-table";
import {
    Typography,
    Chip,
    Tooltip
} from "@mui/material";


export const columns: MRT_ColumnDef<any>[] = [
    {
        accessorKey: "objectKey",
        header: "Object Key",
        size: 100,
    },
    {
        accessorKey: "objectName",
        header: "Object Name",
        size: 100,
    },
    {
        accessorKey: "objectPath",
        header: "Object Path",
        size: 100,
        Cell: ({ cell }) => {
            const full = cell.getValue<string>();
            const preview = full.length > 50 ? full.slice(0, 50) + '…' : full;
            return (
                <Tooltip title={full} placement="top" arrow>
                    <Typography
                        color="text.secondary"
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
        size: 220,
        Cell: ({ cell }) => {
            const value = cell.getValue<string>();

            return (
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
            );
        },
    },
];