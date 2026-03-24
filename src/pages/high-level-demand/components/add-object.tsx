import { useState } from "react";
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Button
} from "@mui/material";
import { Close, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import CustomSelectInput from "../../../components/inputs/select-input/select-input";

/* ── Dialog Props ── */
interface AddObjectDialogProps {
    open: boolean;
    onClose: (open: boolean) => void;
    onAdd?: (newObjects: any[]) => void;
}

const XOPS_List = [
    { value: "Commercial", label: "Commercial" },
    { value: "Consumer", label: "Consumer" },
    { value: "Customer Development", label: "Customer Development" },
    { value: "Customer Operations", label: "Customer Operations" },
    { value: "People", label: "People" },
    { value: "Supply Chat & R&D", label: "Supply Chat & R&D" },
    { value: "Unknown", label: "Unknown" },
];

const OBJECT_LIST = [
    { value: "Account[SOB52770]Carelines Consumer", label: "Account[SOB52770]Carelines Consumer" },
    { value: "ActivityRequest[SOB50369]", label: "ActivityRequest[SOB50369]" },
    { value: "Aggregateddata[TOB58568]", label: "Aggregateddata[TOB58568]" },
];

const AddObjectDialog = ({ open, onClose, onAdd }: AddObjectDialogProps) => {
    const [rows, setRows] = useState([{ id: Date.now(), xops: "", objectName: "" }]);

    const handleAddRow = () => {
        setRows([...rows, { id: Date.now(), xops: "", objectName: "" }]);
    };

    const handleRemoveRow = (id: number) => {
        if (rows.length > 1) {
            setRows(rows.filter((r) => r.id !== id));
        }
    };

    const updateRow = (id: number, field: "xops" | "objectName", value: string) => {
        setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    };

    return (
        <Dialog
            open={open}
            onClose={(_event, reason) => {
                if (reason === "backdropClick") return; // prevent close on outside click
                onClose(false);
            }}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    height: "90vh",
                    borderRadius: 3,
                    p: 2,
                    overflow: "visible",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
                },
            }}
        >
            {/* ── Dialog Header ── */}
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    px: 0,
                    py: 0.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box>
                    <Typography variant="subtitle1" fontWeight={800} letterSpacing="-0.5px" color="text.primary">
                        Add Object in Demand
                    </Typography>
                </Box>
                <IconButton
                    onClick={() => onClose(false)}
                    size="small"
                    sx={{
                        mt: 0,
                        color: "text.secondary",
                        borderRadius: 1.5,
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>

            {/* ── Dialog Content ── */}
            <DialogContent>
                <Box
                    sx={{
                        py: 2,
                        px: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    {rows.map((row) => (
                        <Box key={row.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box sx={{ flex: 1 }}>
                                <CustomSelectInput
                                    label="XOps"
                                    placeholder="Select a xops"
                                    required
                                    options={XOPS_List}
                                    value={row.xops}
                                    onChange={(value) => updateRow(row.id, "xops", value != null ? String(value) : "")}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <CustomSelectInput
                                    label="Object Name"
                                    placeholder="Select a object name"
                                    required
                                    options={OBJECT_LIST}
                                    value={row.objectName}
                                    onChange={(value) => updateRow(row.id, "objectName", value != null ? String(value) : "")}
                                />
                            </Box>
                            {rows.length > 1 && (
                                <IconButton color="error" onClick={() => handleRemoveRow(row.id)} sx={{ mt: 3 }}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Box>
                    ))}

                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddRow}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        Add Another Object
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 0, my: 0, mx: 4 }}>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => onClose(false)}
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        const validRows = rows.filter(r => r.xops && r.objectName);
                        if (validRows.length > 0) {
                            const newObjects = validRows.map(row => {
                                const keyMatch = row.objectName.match(/\[(.*?)\]/);
                                const key = keyMatch ? keyMatch[1] : `NEW_${Math.floor(Math.random() * 1000)}`;
                                const name = row.objectName.replace(/\[.*?\]/, "").trim();

                                return {
                                    objectKey: key,
                                    objectName: name,
                                    objectPath: `[BDLMOUNT]/BusinessDataLake/${row.xops}/${name}`,
                                    metadata: "N",
                                };
                            });

                            if (onAdd) {
                                onAdd(newObjects);
                            }
                            setRows([{ id: Date.now(), xops: "", objectName: "" }]);
                            onClose(false);
                        }
                    }}
                    disabled={!rows.some(r => r.xops && r.objectName)}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddObjectDialog;