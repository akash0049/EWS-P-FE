import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    IconButton,
    Tooltip
} from "@mui/material";
import { Edit, DeleteOutlineOutlined, CalendarTodayOutlined, Check, Close } from "@mui/icons-material";
import CustomSnackbar from "../../components/snackbar/custom-snackbar";
import MaterialTable from "../../components/tables/material-table/material-table";
import ScheduleRule from "./components/schedule-rule/schedule-rule";
import { CalendarCheck, CirclePlus, Save } from 'lucide-react';
import CustomIconButton from "../../components/buttons/icon-button/icon-button";
import { ArrowCircleLeft } from "@mui/icons-material";

import { columns } from "./constants/columns";
import { ALL_DATA } from "./constants/data";

const UserRule = () => {
    const navigate = useNavigate();

    const [openScheduleRule, setOpenScheduleRule] = useState(false);
    const [tableData, setTableData] = useState(ALL_DATA);
    const [showAlert, setShowAlert] = useState({ open: false, success: false, message: "" });

    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

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
                        User Rule
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                        Configure rules for objects added in the demand
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <CustomIconButton
                        size="medium"
                        title="Click here to Configure Objects"
                        icon={<ArrowCircleLeft fontSize="medium" />}
                        onClick={() => navigate("/1/high-level-demand")}
                    />
                    <Button
                        variant="contained"
                        startIcon={<Save size={16} />}
                        onClick={() => {
                            console.log("Saving Requirement:", tableData);
                            setShowAlert({ open: true, success: true, message: "Requirement saved successfully!" });
                            setTimeout(() => setShowAlert({ open: false, success: false, message: "" }), 2000);
                        }}
                    >
                        Save Requirement
                    </Button>
                </Box>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <MaterialTable
                    searchPlaceholder="Search Rules..."
                    columns={columns}
                    data={tableData}
                    options={{
                        enableTopToolbar: true,
                        enableColumnPinning: true,
                        enableRowSelection: true,
                        enableEditing: true,
                        editDisplayMode: "row",
                        enableRowActions: true,
                        positionActionsColumn: "first",
                        createDisplayMode: "row",
                        renderTopToolbarCustomActions: ({ table }) => (
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    startIcon={<CirclePlus size={16} />}
                                    sx={{ fontSize: '11px', height: '30px', px: 1.5, textTransform: 'none' }}
                                    onClick={() => {
                                        table.setCreatingRow(true);
                                    }}
                                >
                                    Add Rule
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<CalendarCheck size={16} />}
                                    disabled={Object.keys(rowSelection).length === 0}
                                    sx={{ fontSize: '11px', height: '30px', px: 1.5, textTransform: 'none' }}
                                    onClick={() => setOpenScheduleRule(true)}
                                >
                                    Schedule Rule
                                </Button>
                            </Box>
                        ),
                        onCreatingRowSave: ({ table, values }) => {
                            if (!values.ruleType || !values.primaryObject) {
                                setShowAlert({ open: true, success: false, message: "Error: Rule Type and Primary Object are mandatory!" });
                                return;
                            }

                            const newId = Math.floor(10000 + Math.random() * 900000);
                            setTableData([{ ...values, userRuleId: newId, scheduled: false }, ...tableData]);

                            table.setCreatingRow(null);
                            setShowAlert({ open: true, success: true, message: "Rule added successfully!" });
                        },
                        onEditingRowSave: ({ table, values }) => {
                            if (!values.ruleType || !values.primaryObject) {
                                setShowAlert({ open: true, success: false, message: "Error: Rule Type and Primary Object are mandatory!" });
                                return;
                            }
                            const newData = tableData.map((item: any) =>
                                item.userRuleId === values.userRuleId ? values : item
                            );
                            setTableData(newData);
                            table.setEditingRow(null);
                        },

                        renderRowActions: ({ row, table }) => {
                            console.log("row", row);

                            const isCreating = table.getState().creatingRow?.id === row.id || ('getIsCreating' in row && (row as any).getIsCreating());
                            const isEditing = table.getState().editingRow?.id === row.id || ('getIsEditing' in row && (row as any).getIsEditing());
                            console.log("isCreating", isCreating);
                            console.log("isEditing", isEditing);

                            if (isCreating || isEditing) {

                                return (
                                    <Box sx={{ display: 'flex', gap: '8px' }}>
                                        <Tooltip arrow placement="top" title="Save">
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    const values = { ...row.original, ...row._valuesCache };
                                                    if (!values.ruleType || !values.primaryObject) {
                                                        setShowAlert({ open: true, success: false, message: "Error: Rule Type and Primary Object are mandatory!" });
                                                        return;
                                                    }

                                                    if (isCreating) {
                                                        const newId = Math.floor(10000 + Math.random() * 900000);
                                                        setTableData([{ ...values, userRuleId: newId, scheduled: false }, ...tableData]);
                                                        table.setCreatingRow(null);
                                                        setShowAlert({ open: true, success: true, message: "Rule added successfully!" });
                                                    } else {
                                                        const newData = tableData.map((item: any) =>
                                                            item.userRuleId === values.userRuleId ? values : item
                                                        );
                                                        setTableData(newData);
                                                        table.setEditingRow(null);
                                                    }
                                                }}
                                                sx={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '6px',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    color: '#10B981', // green
                                                    bgcolor: 'rgba(16, 185, 129, 0.04)',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        borderColor: '#10B981',
                                                        bgcolor: 'rgba(16, 185, 129, 0.12)',
                                                    },
                                                    '& svg': { fontSize: '16px' }
                                                }}
                                            >
                                                <Check />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip arrow placement="top" title="Cancel">
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    if (isCreating) {
                                                        table.setCreatingRow(null);
                                                    } else {
                                                        table.setEditingRow(null);
                                                    }
                                                }}
                                                sx={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '6px',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    color: '#64748B', // slate
                                                    bgcolor: 'rgba(100, 116, 139, 0.04)',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        borderColor: '#64748B',
                                                        bgcolor: 'rgba(100, 116, 139, 0.12)',
                                                    },
                                                    '& svg': { fontSize: '16px' }
                                                }}
                                            >
                                                <Close />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                );
                            }

                            return (
                                <Box sx={{ display: 'flex', gap: '8px' }}>
                                    <Tooltip arrow placement="top" title="Edit">
                                        <IconButton
                                            size="small"
                                            onClick={() => table.setEditingRow(row)}
                                            sx={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '6px',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                color: '#005EEF',
                                                bgcolor: 'rgba(0,94,239,0.04)',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    borderColor: '#005EEF',
                                                    bgcolor: 'rgba(0,94,239,0.12)',
                                                },
                                                '& svg': { fontSize: '16px' }
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip arrow placement="top" title="Schedule">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setRowSelection({ [row.original.userRuleId]: true });
                                                setOpenScheduleRule(true);
                                            }}
                                            sx={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '6px',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                color: '#10B981',
                                                bgcolor: 'rgba(16, 185, 129, 0.04)',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    borderColor: '#10B981',
                                                    bgcolor: 'rgba(16, 185, 129, 0.12)',
                                                },
                                                '& svg': { fontSize: '16px' }
                                            }}
                                        >
                                            <CalendarTodayOutlined />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip arrow placement="top" title="Delete">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                const newData = tableData.filter((item: any) => item.userRuleId !== row.original.userRuleId);
                                                setTableData(newData);

                                                // Optional boundary sync to ensure deleted row falls out of selected set
                                                if (rowSelection[row.original.userRuleId]) {
                                                    const currentSelection = { ...rowSelection };
                                                    delete currentSelection[row.original.userRuleId];
                                                    setRowSelection(currentSelection);
                                                }
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
                                </Box>
                            );
                        },
                        muiEditTextFieldProps: () => ({
                            size: "small",
                            variant: "outlined",
                            sx: {
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "4px",
                                    minHeight: "35px",
                                    "& legend": { display: "none" },
                                    "& fieldset": { top: 0 },
                                    "&.MuiInputBase-multiline": { padding: "0px" }
                                },
                                "& .MuiOutlinedInput-input": {
                                    fontSize: "0.8rem",
                                    padding: "7.5px 14px",
                                    height: "20px",
                                    boxSizing: "border-box",
                                },
                            }
                        }),
                        initialState: {
                            columnPinning: {
                                left: ["mrt-row-actions", "mrt-row-select", "userRuleId", "ruleType"],
                            },
                        },
                        state: {
                            rowSelection,
                        },
                        onRowSelectionChange: setRowSelection,
                        getRowId: (row) => row?.userRuleId?.toString(),
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

            {openScheduleRule &&
                <ScheduleRule
                    open={openScheduleRule}
                    onClose={() => setOpenScheduleRule(false)}
                    onSubmit={() => {
                        const selectedIds = Object.keys(rowSelection);
                        const newData = tableData.map((row: any) =>
                            selectedIds.includes(row.userRuleId.toString()) ? { ...row, scheduled: true } : row
                        );
                        setTableData(newData);
                        setRowSelection({});
                        setShowAlert({ open: true, success: true, message: "Rule(s) scheduled successfully!" });
                    }}
                />
            }

            <CustomSnackbar
                open={showAlert.open}
                message={showAlert.message}
                severity={showAlert.success ? "success" : "error"}
                onClose={() => setShowAlert({ ...showAlert, open: false })}
            />
        </Box>
    );
};

export default UserRule;