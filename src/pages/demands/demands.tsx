import { useState } from "react";
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import MaterialTable from "../../components/tables/material-table/material-table";
import { FilePlusCorner, Users } from 'lucide-react';

import { COLUMNS } from "./constants/columns";
import { DEMANDS } from "./constants/data";
import type { Demand } from "./constants/types";

import CreateNewDemand from "./components/create-new-demand";
import ManageUserGroups from "./components/manage-user-groups";

const Demands = () => {
    const [createDemandOpen, setCreateDemandOpen] = useState(false);
    const [manageUserGroupsOpen, setManageUserGroupsOpen] = useState(false);
    const [data, setData] = useState<Demand[]>(DEMANDS);

    const handleCreateDemand = (newDemand: Demand) => {
        setData((prev) => [newDemand, ...prev]);
        setCreateDemandOpen(false);
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
                        variant="subtitle1"
                        fontWeight={800}
                        letterSpacing="-0.5px"
                        color="text.primary"
                    >
                        Demand Selection
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Engagement Initiation - Capture High Level Demand - Capture Demand Details
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Button
                        variant="contained"
                        startIcon={<FilePlusCorner size={16} />}
                        onClick={() => setCreateDemandOpen(true)}
                    >
                        Create New Demand
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Users size={16} />}
                        onClick={() => setManageUserGroupsOpen(true)}
                    >
                        Manage User Groups
                    </Button>
                </Box>
            </Box>

            {/* ── Table (no embedded top toolbar) ── */}
            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <MaterialTable
                    searchPlaceholder="Search Demands..."
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
            {createDemandOpen &&
                <CreateNewDemand
                    open={createDemandOpen}
                    onClose={() => setCreateDemandOpen(false)}
                    onCreate={handleCreateDemand}
                />
            }

            {/* ── Manage User Groups Dialog ── */}
            {manageUserGroupsOpen &&
                <ManageUserGroups
                    open={manageUserGroupsOpen}
                    onClose={() => setManageUserGroupsOpen(false)}
                />
            }
        </Box>
    );
};

export default Demands;