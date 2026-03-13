import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { type MRT_ColumnDef } from "material-react-table";
import {
    Box,
    Button,
    Typography,
    Chip,
    Tooltip,
    // Alert
} from "@mui/material";
import MaterialTable from "../../components/tables/material-table/material-table";
import DemandDetails from "./components/demand-details";
import { DeleteOutline, ArrowCircleRight } from "@mui/icons-material";
import AddObjectDialog from "./components/add-object";
import CustomIconButton from "../../components/buttons/icon-button/icon-button";
import { Save, BookText, FilePlus } from 'lucide-react';

const ALL_DATA: {}[] = [
    {
        objectKey: "TOB41203",
        objectName: "OTMLocation",
        objectPath: "[BDLMOUNT]/BusinessDataLake/SC/ReferenceObject/OTMLocation/Processed_Parq",
        metadata: "Y",
    },
    {
        objectKey: "TOB20012",
        objectName: "Plant",
        objectPath: "[BDLMOUNT]/BusinessDataLake/SC/ReferenceObject/Plant/Processed_Parquet",
        metadata: "N",
    },
    {
        objectKey: "TOB30014",
        objectName: "PurchaseDocumentHeader",
        objectPath: "[BDLMOUNT]/BusinessDataLake/SC/TransactionObject/PurchaseDocumentHeader",
        metadata: "Y",
    },
    {
        objectKey: "TOB42901",
        objectName: "CostCenter",
        objectPath: "[BDLMOUNT]/BusinessDataLake/HR/Hierarchies/CostCenter/Processed",
        metadata: "Y",
    },
    {
        objectKey: "TOB41909",
        objectName: "OTMShipmentStatus",
        objectPath: "[BDLMOUNT]/BusinessDataLake/SC/TransactionObject/OTMShipmentStatus/Process",
        metadata: "Y",
    },
];

const HighLevelDemand = () => {
    const navigate = useNavigate();

    const [openDemandDetails, setOpenDemandDetails] = useState(false);
    const [openAddObject, setOpenAddObject] = useState(false);

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
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
                                fontWeight: 700,
                                fontSize: "0.75rem",
                                borderRadius: "6px",
                                bgcolor: value === "Y" ? "#047857" : "#B91C1C",
                                color: "#FFFFFF",
                                border: "1px solid",
                                height: 30,
                                minWidth: 32,
                            }}
                        />
                    );
                },
            },
            {
                id: "actions",
                header: "Actions",
                enableSorting: false,
                enableColumnFilter: false,
                size: 100,
                Cell: () => (
                    <Button size="small" sx={{ color: 'grey' }}>
                        <DeleteOutline />
                    </Button>
                ),
            },
        ],
        []
    );

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
                        onClick={() => { }}
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
                    data={ALL_DATA}
                    options={{ enableTopToolbar: true }}
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
            <AddObjectDialog open={openAddObject} onClose={setOpenAddObject} />
        </Box>
    );
};

export default HighLevelDemand;