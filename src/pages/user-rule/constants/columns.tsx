import { type MRT_ColumnDef } from "material-react-table";
import { AlarmOnOutlined } from "@mui/icons-material";
import {
    Box,
    Typography
} from "@mui/material";
import CustomSelectInput from "../../../components/inputs/select-input/select-input";
import CustomTextInput from "../../../components/inputs/text-input/text-input";

export const columns: MRT_ColumnDef<any>[] =
    [
        {
            accessorKey: "userRuleId",
            header: "User Rule ID",
            size: 120,
            enableEditing: false,
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
            Edit: ({ cell, column, row, table }) => {
                const currentValue = (row._valuesCache && row._valuesCache[column.id]) ?? cell.getValue() ?? "";

                return (
                    <CustomSelectInput
                        required
                        label=""
                        options={[
                            { value: "KPI Trend (Fraction) [1]", label: "KPI Trend (Fraction) [1]" },
                            { value: "KPI Trend (Sum) [2]", label: "KPI Trend (Sum) [2]" },
                            { value: "KPI Trend (Ratio Row Count) [3]", label: "KPI Trend (Ratio Row Count) [3]" },
                            { value: "KPI Trend (Ratio Sum) [4]", label: "KPI Trend (Ratio Sum) [4]" },
                            { value: "KPI Trend (Sum Row Count) [5]", label: "KPI Trend (Sum Row Count) [5]" },
                            { value: "KPI Trend (Difference) [6]", label: "KPI Trend (Difference) [6]" },
                            { value: "KPI Trend (Average) [7]", label: "KPI Trend (Average) [7]" },
                            { value: "Date Format Check (Date & Time) [42]", label: "Date Format Check (Date & Time) [42]" },
                        ]}
                        value={currentValue}
                        onChange={(value) => {
                            const strVal = value != null ? String(value) : "";

                            if (!row._valuesCache) row._valuesCache = {};
                            row._valuesCache[column.id] = strVal;
                            row._valuesCache["ruleName"] = strVal; // Sync ruleName natively

                            // Re-render Edit View
                            if ('getIsCreating' in row && (row as any).getIsCreating()) {
                                table.setCreatingRow({ ...row });
                            } else if (table.setEditingRow) {
                                table.setEditingRow({ ...row });
                            }
                        }}
                    />
                );
            }
        },
        {
            accessorKey: "ruleName",
            header: "Rule Name",
            Edit: ({ cell, column, row, table }) => {
                const currentValue = (row._valuesCache && row._valuesCache[column.id]) ?? cell.getValue() ?? "";
                return (
                    <CustomTextInput
                        required
                        label=""
                        value={currentValue}
                        onChange={(e) => {
                            const strVal = e.target.value;
                            if (!row._valuesCache) row._valuesCache = {};
                            row._valuesCache[column.id] = strVal;

                            if ('getIsCreating' in row && (row as any).getIsCreating()) {
                                table.setCreatingRow({ ...row });
                            } else if (table.setEditingRow) {
                                table.setEditingRow({ ...row });
                            }
                        }}
                    />
                );
            }
        },
        {
            accessorKey: "primaryObject",
            header: "Primary Object",
            Edit: ({ cell, column, row, table }) => {
                const currentValue = (row._valuesCache && row._valuesCache[column.id]) ?? cell.getValue() ?? "";
                return (
                    <CustomSelectInput
                        required
                        label=""
                        options={[
                            { value: "BDLProductionCost", label: "BDLProductionCost" },
                            { value: "ProductionCostEnhanced", label: "ProductionCostEnhanced" },
                        ]}
                        value={currentValue}
                        onChange={(value) => {
                            const strVal = value != null ? String(value) : "";
                            if (!row._valuesCache) row._valuesCache = {};
                            row._valuesCache[column.id] = strVal;

                            if ('getIsCreating' in row && (row as any).getIsCreating()) {
                                table.setCreatingRow({ ...row });
                            } else if (table.setEditingRow) {
                                table.setEditingRow({ ...row });
                            }
                        }}
                    />
                );
            }
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
            header: "Product DevOps Notification"
        },
    ];