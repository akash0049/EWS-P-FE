import { useState } from "react";
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
} from "@mui/material";
import CustomSelectInput from "../../../../components/inputs/select-input/select-input";
import CustomTextInput from "../../../../components/inputs/text-input/text-input";

/* ── Dialog Props ── */
interface NewDemandDialogProps {
    open: boolean;
    onClose: (value: boolean) => void;
    onAdd?: (newRule: any) => void;
}

const RuleTypeList = [
    { value: "KPI Trend (Fraction) [1]", label: "KPI Trend (Fraction) [1]" },
    { value: "KPI Trend (Sum) [2]", label: "KPI Trend (Sum) [2]" },
    { value: "KPI Trend (Ratio Row Count) [3]", label: "KPI Trend (Ratio Row Count) [3]" },
    { value: "KPI Trend (Ratio Sum) [4]", label: "KPI Trend (Ratio Sum) [4]" },
    { value: "KPI Trend (Sum Row Count) [5]", label: "KPI Trend (Sum Row Count) [5]" },
    { value: "KPI Trend (Difference) [6]", label: "KPI Trend (Difference) [6]" },
    { value: "KPI Trend (Average) [7]", label: "KPI Trend (Average) [7]" },
    { value: "Date Format Check (Date & Time) [42]", label: "Date Format Check (Date & Time) [42]" },
];

const AddNewRule = ({ open, onClose, onAdd }: NewDemandDialogProps) => {
    const [ruleType, setRuleType] = useState<string>("");
    const [ruleName, setRuleName] = useState<string>("");
    const [ruleDescription, setRuleDescription] = useState<string>("");
    const [primaryObject, setPrimaryObject] = useState<string>("");

    return (
        <Dialog
            open={open}
            onClose={(_event, reason) => {
                if (reason === "backdropClick") return;
                onClose(false);
            }}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    height: "95vh",
                    borderRadius: 3,
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
                    pb: 1,
                    pt: 2.5,
                    px: 3,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box>
                    <Typography variant="subtitle1" fontWeight={800} letterSpacing="-0.5px" color="text.primary">
                        Add New Rule
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                        New rule to be added by DQ Engagement Team
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    gap: 1
                }}>
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
                            if (ruleType && ruleName && primaryObject) {
                                onAdd?.({ ruleType, ruleName, primaryObject, scheduled: false });
                                onClose(false);
                            }
                        }}
                        disabled={!ruleType || !ruleName || !primaryObject}
                    >
                        Submit
                    </Button>
                </Box>
            </DialogTitle>

            {/* ── Dialog Content ── */}
            <DialogContent sx={{ mx: 2, mt: 1 }}>
                <CustomSelectInput
                    label="Rule Type"
                    placeholder="Select a rule type"
                    description="Please select rule type to add new rule"
                    required
                    options={RuleTypeList}
                    value={ruleType}
                    onChange={(value) => {
                        console.log(value)
                        setRuleType(value != null ? String(value) : "")
                        setRuleName(value != null ? String(value) : "")
                    }}
                />
                {ruleType &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <CustomTextInput
                            label="Resolver Group Name"
                            placeholder="Enter Resolver Group Name"
                            required
                            value={ruleName}
                            onChange={(e) => setRuleName(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                },
                            }}
                        />
                        <CustomTextInput
                            label="Rule Description"
                            placeholder="Enter Rule Description"
                            required
                            multiline
                            rows={2}
                            value={ruleDescription}
                            onChange={(e) => setRuleDescription(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                },
                            }}
                        />

                        <CustomSelectInput
                            label="Primary Object"
                            placeholder="Select a primary object"
                            required
                            options={[
                                { value: "BDLProductionCost", label: "BDLProductionCost" },
                                { value: "ProductionCostEnhanced", label: "ProductionCostEnhanced" },
                            ]}
                            value={primaryObject}
                            onChange={(value) => {
                                setPrimaryObject(value != null ? String(value) : "")
                            }}
                        />
                    </Box>

                }
            </DialogContent>
        </Dialog>
    );
};

export default AddNewRule;