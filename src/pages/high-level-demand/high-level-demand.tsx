import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    Grid
} from "@mui/material";
import MaterialTable from "../../components/tables/material-table/material-table";
import DemandDetails from "./components/demand-details";
import { ArrowCircleRight, Save } from "@mui/icons-material";
import AddObject from "./components/add-object";
import CustomIconButton from "../../components/buttons/icon-button/icon-button";
import CustomSnackbar from "../../components/snackbar/custom-snackbar";
import { BookText } from 'lucide-react';

import { columns } from "./constants/columns";
import { ALL_DATA } from "./constants/data";

const HighLevelDemand = () => {
    const navigate = useNavigate();

    const [openDemandDetails, setOpenDemandDetails] = useState(false);
    const [tableData, setTableData] = useState(ALL_DATA);
    const [showSuccess, setShowSuccess] = useState(false);

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
                        High Level Demand
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Below details intends to capture the requirements at high level
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>

                    <Button
                        variant="contained"
                        startIcon={<BookText size={16} />}
                        onClick={() => setOpenDemandDetails(true)}
                    >
                        Demand Details
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Save fontSize='small' />}
                        onClick={() => {
                            console.log("Saving Requirement:", tableData);
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 2000);
                        }}
                    >
                        Save Requirement
                    </Button>
                    <CustomIconButton
                        size="medium"
                        title="Click here to Configure Rules"
                        icon={<ArrowCircleRight fontSize="medium" />}
                        onClick={() => navigate("/1/user-rule")}
                    />
                </Box>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Grid container spacing={2} sx={{ flex: 1, overflow: "hidden" }}>
                    <Grid size={{ xs: 12, md: 3 }} sx={{ height: "100%" }}>
                        <AddObject
                            onAddObject={(newObj) => {
                                if (!tableData.some((item: any) => item.objectKey === newObj.objectKey)) {
                                    setTableData([...tableData, newObj]);
                                }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }} sx={{ height: "100%" }}>
                        <MaterialTable
                            searchPlaceholder="Search Objects..."
                            columns={columns(tableData, setTableData)}
                            data={tableData}
                            options={{
                                enableTopToolbar: true,
                                globalFilterFn: 'contains',
                                initialState: {
                                    columnPinning: {
                                        right: ["actions"],
                                    },
                                },
                            }}
                            enableBulkUpload
                            onBulkUploadSubmit={(data) => {
                                setTableData((prev) => {
                                    const newData = [...prev];
                                    for (const item of data) {
                                        if (!newData.some(existing => (existing as any).objectKey === item.objectKey)) {
                                            newData.push(item);
                                        }
                                    }
                                    return newData;
                                });
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Keyframe for pulsing dot */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>

            <DemandDetails open={openDemandDetails} toggleDrawer={setOpenDemandDetails} />

            <CustomSnackbar
                open={showSuccess}
                message="Requirement saved successfully!"
                severity="success"
                autoHideDuration={2000}
                onClose={() => setShowSuccess(false)}
            />
        </Box>
    );
};

export default HighLevelDemand;