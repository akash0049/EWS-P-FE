import { type MRT_ColumnDef } from "material-react-table";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Chip,
    IconButton,
    Tooltip,
} from "@mui/material";
import {
    Globe,
    Users,
    CalendarDays,
} from "lucide-react";
import { TrendingUp } from "@mui/icons-material";

import type { Demand } from "./types";

const ActionButtons = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
            <Tooltip title="Click To High Level Demand" arrow>
                <IconButton
                    size="small"
                    sx={{ color: "text.disabled", borderRadius: 1.5, "&:hover": { color: "primary.main", bgcolor: "primary.50" } }}
                    onClick={() => navigate("/1/high-level-demand")}
                >
                    <TrendingUp fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Click To User Rule" arrow>
                <IconButton
                    size="small"
                    sx={{ color: "text.disabled", borderRadius: 1.5, "&:hover": { color: "primary.main", bgcolor: "primary.50" } }}
                    onClick={() => navigate("/1/user-rule")}

                >
                    <Users size={16} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Click To Rule Scheduler" arrow>
                <IconButton
                    size="small"
                    sx={{ color: "text.disabled", borderRadius: 1.5, "&:hover": { color: "primary.main", bgcolor: "primary.50" } }}
                >
                    <CalendarDays size={16} />
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export const COLUMNS: MRT_ColumnDef<Demand>[] = [
    {
        header: "Demand Name",
        accessorKey: "name",
        size: 200,
        Cell: ({ row }) => (
            <Typography
                sx={{
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                    fontSize: 'clamp(9px, 11px, 13px)',
                    fontWeight: 500
                }}
            >
                {row.original.name}
            </Typography>
        ),
    },
    {
        header: "Status",
        accessorKey: "status",
        size: 100,
        filterVariant: 'select',
        filterSelectOptions: ['Active', 'Inactive'],
        Cell: ({ cell }) => {
            const value = cell.getValue<string>();

            return (
                <Chip
                    label={value}
                    size="small"
                    sx={{
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: "16px",
                        height: 24,
                        bgcolor: value === "Active" ? "rgba(0, 134, 81, 0.08)" : "rgba(217, 45, 32, 0.08)",
                        color: value === "Active" ? "#008651" : "#D92D20",
                        border: '1px solid',
                        borderColor: value === "Active" ? "rgba(0, 134, 81, 0.2)" : "rgba(217, 45, 32, 0.2)",
                        ".MuiChip-label": {
                            px: 1.5,
                        },
                    }}
                />

            );
        },
    },
    {
        header: "Description",
        accessorKey: "description",
        size: 350,
        Cell: ({ cell }) => {
            const full = cell.getValue<string>();
            const words = full.split(' ');
            const preview = words.length > 8 ? words.slice(0, 8).join(' ') + '…' : full;
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
                        {preview || 'N/A'}
                    </Typography>
                </Tooltip>
            );
        },
    },
    {
        header: "Market",
        accessorKey: "market",
        size: 120,
        filterVariant: 'select',
        filterSelectOptions: ['North America', 'Europe', 'Asia Pacific', 'Global'],
        Cell: ({ cell }) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Globe size={15} color="#94A3B8" />
                <Typography sx={{
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                    fontSize: 'clamp(9px, 11px, 13px)',
                    fontWeight: 500
                }}>
                    {cell.getValue<string>()}
                </Typography>
            </Box>
        ),
    },
    {
        header: "Actions",
        id: "actions",
        size: 130,
        enableSorting: false,
        enableColumnFilter: false,
        enableHiding: false,
        visibleInShowHideMenu: false,
        muiTableHeadCellProps: { align: "center" },
        Cell: () => <ActionButtons />,
    },
];