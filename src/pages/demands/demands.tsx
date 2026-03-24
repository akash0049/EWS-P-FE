import { useState } from "react";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import MaterialTable from "../../components/tables/material-table/material-table";
import NewDemandDialog from "./components/create-new-demand/new-demand-dialog";
import { FilePlusCorner } from 'lucide-react';

import { COLUMNS } from "./constants/columns";
import { ALL_DATA } from "./constants/data";
import type { Demand } from "./constants/types";

const Demands = () => {
    const [createOpen, setCreateOpen] = useState(false);
    const [data, setData] = useState<Demand[]>(ALL_DATA);

    const handleCreateDemand = (newDemand: Demand) => {
        setData((prev) => [newDemand, ...prev]);
        setCreateOpen(false);
    };

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
                    data={data}
                    options={{ 
                        enableTopToolbar: true,
                        globalFilterFn: 'contains', 
                    }}
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
            <NewDemandDialog 
                open={createOpen} 
                onClose={() => setCreateOpen(false)} 
                onCreate={handleCreateDemand} 
            />
        </Box>
    );
};

export default Demands;