import { useState, useMemo } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import {
    Box,
    Button,
    Typography
} from "@mui/material";
import { AlarmOnOutlined } from "@mui/icons-material";
import MaterialTable from "../../components/tables/material-table/material-table";
import AddNewRule from "./components/add-new-rule/add-new-rule";
import ScheduleRule from "./components/schedule-rule/schedule-rule";
import { CalendarCheck, CirclePlus } from 'lucide-react';

const ALL_DATA: {}[] = [
    {
        "userRuleId": 62953,
        "ruleType": "SLA (On Time) Check",
        "ruleName": "SLA (On Time) Check",
        "primaryObject": "BDLProductionCost",
        "primaryRegion": "Fusion",
        "scheduled": true
    },
    {
        "userRuleId": 62952,
        "ruleType": "NULL Value Check",
        "ruleName": "NULL Value Check",
        "primaryObject": "BDLProductionCost",
        "primaryRegion": "Fusion"
    },
    {
        "userRuleId": 62951,
        "ruleType": "Primary Key Check",
        "ruleName": "Primary Key Check",
        "primaryObject": "BDLProductionCost",
        "primaryRegion": "Fusion"
    },
    {
        "userRuleId": 62950,
        "ruleType": "Job Completion Check",
        "ruleName": "Job Completion Check",
        "primaryObject": "BDLProductionCost",
        "primaryRegion": "Fusion",
        "scheduled": true
    },
    {
        "userRuleId": 62949,
        "ruleType": "SLA (On Time) Check",
        "ruleName": "SLA (On Time) Check",
        "primaryObject": "ProductionCostEnhanced",
        "primaryRegion": "Fusion"
    },
    {
        "userRuleId": 62948,
        "ruleType": "NULL Value Check",
        "ruleName": "NULL Value Check",
        "primaryObject": "ProductionCostEnhanced",
        "primaryRegion": "Fusion"
    },
    {
        "userRuleId": 62947,
        "ruleType": "Primary Key Check",
        "ruleName": "Primary Key Check",
        "primaryObject": "ProductionCostEnhanced",
        "primaryRegion": "Fusion",
        "scheduled": true
    },
    {
        "userRuleId": 62946,
        "ruleType": "Job Completion Check",
        "ruleName": "Job Completion Check",
        "primaryObject": "ProductionCostEnhanced",
        "primaryRegion": "Fusion"
    },
];

const UserRule = () => {
    const [openAddRule, setOpenAddRule] = useState(false);
    const [openScheduleRule, setOpenScheduleRule] = useState(false);

    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "userRuleId",
                header: "User Rule ID",
                size: 120,
                Cell: ({ row }) => (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>

                        <Typography
                            sx={{
                                whiteSpace: 'nowrap',
                                cursor: 'default',
                                fontSize: 'clamp(9px, 11px, 13px)',
                                fontWeight: 500
                            }}
                        >
                            {row.original.userRuleId}
                        </Typography>

                        {row.original.scheduled &&
                            <AlarmOnOutlined fontSize="small" color="success" />
                        }
                    </Box>
                ),
            },
            {
                accessorKey: "ruleType",
                header: "Rule Type",
            },
            {
                accessorKey: "ruleName",
                header: "Rule Name",
            },
            {
                accessorKey: "primaryObject",
                header: "Primary Object",
            },
            {
                accessorKey: "primaryRegion",
                header: "Primary Region",
            },
            {
                accessorKey: "secondaryObject",
                header: "Secondary Object",
            },
            {
                accessorKey: "secondaryRegion",
                header: "Secondary Region",
            },
            {
                accessorKey: "primaryAttribute",
                header: "Primary Attribute",
            },
            {
                accessorKey: "secondaryAttribute",
                header: "Secondary Attribute",
            },
            {
                accessorKey: "parameter",
                header: "Parameter",
            },
            {
                accessorKey: "constantXAndY",
                header: "Constant X & Y",
            },
            {
                accessorKey: "whereCondition",
                header: "Where Condition",
            },
            {
                accessorKey: "join",
                header: "Join",
            },
            {
                accessorKey: "isActive",
                header: "Is Active",
            },
            {
                accessorKey: "productDevopsNotification",
                header: "Product DevOps Notification",
                size: 260,
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
                        User Rule
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                        Configure rules for objects added in the demand
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Button
                        variant="contained"
                        startIcon={<CirclePlus size={16} />}
                        onClick={() => setOpenAddRule(true)}
                    >
                        Add New Rule
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<CalendarCheck size={16} />}
                        disabled={Object.keys(rowSelection).length === 0}
                        onClick={() => setOpenScheduleRule(true)}
                    >
                        Schedule Rule
                    </Button>
                    {/* <Button
                        variant="contained"
                        onClick={() => { }}
                    >
                        Save Requirement
                    </Button> */}
                    {/* <CustomIconButton
                        title="Click here to Configure Rules"
                        icon={<ArrowCircleRight fontSize="medium" />}
                        onClick={() => navigate("/1/user-rule")}
                    /> */}
                </Box>
            </Box>

            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <MaterialTable
                    columns={columns}
                    data={ALL_DATA}
                    options={{
                        enableTopToolbar: true,
                        enableColumnPinning: true,
                        enableRowSelection: true,
                        initialState: {
                            columnPinning: {
                                left: ["mrt-row-select", "userRuleId", "ruleType"],
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

            {openAddRule &&
                <AddNewRule
                    open={openAddRule}
                    onClose={() => setOpenAddRule(false)}
                />
            }
            {openScheduleRule &&
                <ScheduleRule
                    open={openScheduleRule}
                    onClose={() => setOpenScheduleRule(false)}
                />
            }
        </Box>
    );
};

export default UserRule;