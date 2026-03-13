import {
    Box,
    Typography,
} from "@mui/material";
import { type MRT_ColumnDef } from "material-react-table";
import MaterialTable from "../../components/tables/material-table/material-table";

type RuleType = {
    ruleTypeId: string;
    ruleTypeName: string;
    ruleCheckType: string;
    definition: string;
};


const ALL_DATA: RuleType[] = [
    {
        ruleTypeId: "1",
        ruleTypeName: "KPI Trend (Fraction)",
        ruleCheckType: "Trend",
        definition: "Checks if the current week/month KPI values (Calculated as Numerator / Denominator) are with in defined threshold",
    },
    {
        ruleTypeId: "2",
        ruleTypeName: "KPI Trend (Sum)",
        ruleCheckType: "Trend",
        definition: "Checks if the current week/month KPI values (Calculated as sum of a attribute) are with in defined threshold",
    },
    {
        ruleTypeId: "3",
        ruleTypeName: "KPI Trend (Ratio Row Count)",
        ruleCheckType: "Trend",
        definition: "Checks Row Count at Row level / Sum (Row Count) at CalWeek level or CalMonth level",
    },
    {
        ruleTypeId: "4",
        ruleTypeName: "KPI Trend (Ratio Sum)",
        ruleCheckType: "Trend",
        definition: "Checks Attribute at Row level / Sum (Attribute) at CalWeek level or CalMonth level",
    },
    {
        ruleTypeId: "5",
        ruleTypeName: "KPI Trend (Sum Row Count)",
        ruleCheckType: "Trend",
        definition: "Checks Row Count at Row level at CalWeek level or CalMonth level",
    },
    {
        ruleTypeId: "6",
        ruleTypeName: "KPI Trend (Difference)",
        ruleCheckType: "Trend",
        definition: "Checks if the current week/month KPI values (Attribute 1 - Attribute 2) are with in defined threshold",
    },
    {
        ruleTypeId: "7",
        ruleTypeName: "KPI Trend (Average)",
        ruleCheckType: "Trend",
        definition: "Checks if the current week/month KPI values (Calculated as Sum of an attribute / count of an attribute) are with in defined threshold",
    }
];

const COLUMNS: MRT_ColumnDef<RuleType>[] = [
    {
        header: "Rule Type ID",
        accessorKey: "ruleTypeId",
        size: 100
    },
    {
        header: "Rule Type Name",
        accessorKey: "ruleTypeName",
        size: 150
    },
    {
        header: "Rule Check Type",
        accessorKey: "ruleCheckType",
        size: 100
    },
    {
        header: "Definition",
        accessorKey: "definition",
        size: 400
    }
];

const Annexure = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, height: "100%" }}>
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
                        Annexure
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                        Annexure table showing all the different Rule Types available.
                    </Typography>
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
        </Box>
    )
}

export default Annexure