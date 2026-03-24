import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Typography,
    IconButton,
    Tooltip
} from "@mui/material";
import MaterialTable from "../../components/tables/material-table/material-table";
import DemandDetails from "./components/demand-details";
import { ArrowCircleRight, DeleteOutlineOutlined } from "@mui/icons-material";
import AddObjectDialog from "./components/add-object";
import CustomIconButton from "../../components/buttons/icon-button/icon-button";
import CustomSnackbar from "../../components/snackbar/custom-snackbar";
import { Save, BookText, FilePlus } from 'lucide-react';

import { columns } from "./constants/columns";
import { ALL_DATA } from "./constants/data";

const HighLevelDemand = () => {
    const navigate = useNavigate();

    const [openDemandDetails, setOpenDemandDetails] = useState(false);
    const [openAddObject, setOpenAddObject] = useState(false);
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
                        variant="h6"
                        fontWeight={800}
                        letterSpacing="-0.5px"
                        color="text.primary"
                    >
                        High Level Demand
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                        Below details intends to capture the requirements at high level
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Button
                        variant="contained"
                        startIcon={<FilePlus size={16} />}
                        onClick={() => setOpenAddObject(true)}
                    >
                        Add Object
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<BookText size={16} />}
                        onClick={() => setOpenDemandDetails(true)}
                    >
                        Demand Details
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Save size={16} />}
                        onClick={() => {
                            console.log("Saving Requirement:", tableData);
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 2000);
                        }}
                    >
                        Save Requirement
                    </Button>
                    <CustomIconButton
                        title="Click here to Configure Rules"
                        icon={<ArrowCircleRight fontSize="medium" />}
                        onClick={() => navigate("/1/user-rule")}
                    />
                </Box>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <MaterialTable
                    columns={columns}
                    data={tableData}
                    options={{
                        enableTopToolbar: true,
                        enableEditing: true,
                        editDisplayMode: "row",
                        enableRowActions: true,
                        positionActionsColumn: "last",
                        onEditingRowSave: ({ table, values }) => {
                            const newData = tableData.map((item: any) =>
                                item.objectKey === values.objectKey ? values : item
                            );
                            setTableData(newData);
                            table.setEditingRow(null);
                        },
                        renderRowActions: ({ row }) => (
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
                        ),
                    }}
                />
            </Box>
            {/* 
            <Box mt={0} display="flex" flexDirection="column" gap={0}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                    borderColor="divider"
                >
                    <Alert
                        severity="warning"
                        icon={false}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "warning.light",
                            backgroundColor: "rgba(255, 244, 229, 0.6)",
                            px: 1,
                            py: 0
                        }}
                    >
                        <Typography variant="caption" color="warning.dark">
                            <strong>Note:</strong> Rules Created on objects with Metadata flag 'N'
                            will not be able to submit for translator unless the issue in metadata are fixed.
                        </Typography>
                    </Alert>
                </Box>
            </Box> */}

            {/* Keyframe for pulsing dot */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>

            <DemandDetails open={openDemandDetails} toggleDrawer={setOpenDemandDetails} />
            <AddObjectDialog open={openAddObject} onClose={setOpenAddObject} onAdd={(newObjs) => setTableData([...tableData, ...newObjs])} />

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