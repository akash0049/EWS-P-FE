import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type MRT_ColumnDef } from "material-react-table";
import {
    Box,
    Button,
    IconButton,
    Tooltip,
    Typography,
    Chip
} from "@mui/material";
import {
    Users,
    CalendarDays,
    Globe,
} from "lucide-react";
import { TrendingUp } from "@mui/icons-material";
import MaterialTable from "../../components/tables/material-table/material-table";
import NewDemandDialog from "./components/create-new-demand/new-demand-dialog";
import { FilePlusCorner } from 'lucide-react';

type Status = "Active" | "Inactive";

type Demand = {
    name: string;
    status: Status;
    description: string;
    market: string;
};


const ALL_DATA: Demand[] = [
    {
        name: "Enterprise Cloud Expansion",
        status: "Active",
        description: "Scale out hybrid cloud architecture for Fortune 500 financial clients.",
        market: "North America",
    },
    {
        name: "Retail Data Pipeline",
        status: "Inactive",
        description: "Consolidation of POS data from 200+ European locations into Snowflake.",
        market: "Europe",
    },
    {
        name: "Legacy Migration Phase II",
        status: "Active",
        description: "Sunsetting on-premise mainframe systems and migrating to AWS serverless.",
        market: "Asia Pacific",
    },
    {
        name: "Cybersecurity Audit 2024",
        status: "Inactive",
        description: "Annual security compliance assessment across all regional data centers.",
        market: "Global",
    },
    {
        name: "Enterprise Cloud Expansion",
        status: "Active",
        description: "Scale out hybrid cloud architecture for Fortune 500 financial clients.",
        market: "North America",
    },
    {
        name: "Retail Data Pipeline",
        status: "Inactive",
        description: "Consolidation of POS data from 200+ European locations into Snowflake.",
        market: "Europe",
    },
    {
        name: "Legacy Migration Phase II",
        status: "Active",
        description: "Sunsetting on-premise mainframe systems and migrating to AWS serverless.",
        market: "Asia Pacific",
    },
    {
        name: "Cybersecurity Audit 2024",
        status: "Inactive",
        description: "Annual security compliance assessment across all regional data centers.",
        market: "Global",
    },
    {
        name: "Enterprise Cloud Expansion",
        status: "Active",
        description: "Scale out hybrid cloud architecture for Fortune 500 financial clients.",
        market: "North America",
    },
    {
        name: "Retail Data Pipeline",
        status: "Inactive",
        description: "Consolidation of POS data from 200+ European locations into Snowflake.",
        market: "Europe",
    },
    {
        name: "Legacy Migration Phase II",
        status: "Active",
        description: "Sunsetting on-premise mainframe systems and migrating to AWS serverless.",
        market: "Asia Pacific",
    },
    {
        name: "Cybersecurity Audit 2024",
        status: "Inactive",
        description: "Annual security compliance assessment across all regional data centers.",
        market: "Global",
    },
];

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

const COLUMNS: MRT_ColumnDef<Demand>[] = [
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
        Cell: ({ cell }) => {
            const value = cell.getValue<string>();

            return (
                <Chip
                    label={value}
                    size="small"
                    sx={{
                        fontSize: 'clamp(9px, 11px, 13px)',
                        fontWeight: 500,
                        borderRadius: "4px",
                        px: 0.5,
                        height: 24,

                        bgcolor: value === "Active" ? "#E6F6F1" : "#FFEAEA",
                        color: value === "Active" ? "#008651" : "#D92D20",
                        border: `1px solid ${value === "Active" ? "#008651" : "#D92D20"}`,
                        ".MuiChip-label": {
                            px: 0.5,
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
                        {preview}
                    </Typography>
                </Tooltip>
            );
        },
    },
    {
        header: "Market",
        accessorKey: "market",
        size: 120,
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
        muiTableHeadCellProps: { align: "center" },
        Cell: () => <ActionButtons />,
    },
];

const Demands = () => {
    const [createOpen, setCreateOpen] = useState(false);
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, height: "100%" }}>
            {/* ── Page Header ── */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={800}
                        letterSpacing="-0.5px"
                        color="text.primary"
                    >
                        Demand Selection
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                        Engagement Initiation - Capture High Level Demand - Capture Demand Details
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Button
                        variant="contained"
                        startIcon={<FilePlusCorner size={16} />}
                        onClick={() => setCreateOpen(true)}
                    >
                        Create New Demand
                    </Button>
                </Box>
            </Box>

            {/* ── Table (no embedded top toolbar) ── */}
            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <MaterialTable
                    columns={COLUMNS}
                    data={ALL_DATA}
                    options={{ enableTopToolbar: true }}
                />
            </Box>

            {/* Keyframe for pulsing dot */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>

            {/* ── Create New Demand Dialog ── */}
            <NewDemandDialog open={createOpen} onClose={() => setCreateOpen(false)} />
        </Box>
    );
};

export default Demands;