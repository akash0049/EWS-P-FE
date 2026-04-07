import { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Card,
    Button,
    Chip
} from "@mui/material";
import CustomSelectInput from "../../components/inputs/select-input/select-input";
import CustomTextInput from "../../components/inputs/text-input/text-input";
import CustomIconButton from "../../components/buttons/icon-button/icon-button";
import { RefreshCcw, Settings, Activity, Send, Play } from "lucide-react";

const Translator = () => {
    // Left side states
    const [demand, setDemand] = useState<string>("");
    const [userRule, setUserRule] = useState<string>("");
    const [jiraId, setJiraId] = useState<string>("");
    const [ruleType, setRuleType] = useState<string>("");

    // Bottom left states
    const [estRunCost, setEstRunCost] = useState<string>("");
    const [maxExecTime, setMaxExecTime] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    // Right side states
    const [xops, setXops] = useState<string>("");

    // Meta read-only states
    const [metaWhereRead, setMetaWhereRead] = useState<string>("");
    const [metaJoinRead, setMetaJoinRead] = useState<string>("");
    const [metaFilterRead, setMetaFilterRead] = useState<string>("");

    // Meta editable states
    const [metaWhereEdit, setMetaWhereEdit] = useState<string>("");
    const [metaJoinEdit, setMetaJoinEdit] = useState<string>("");
    const [metaFilterEdit, setMetaFilterEdit] = useState<string>("");

    // Interaction / Dummy updates
    useEffect(() => {
        if (demand && userRule) {
            setJiraId("JIRA-89321");
            setEstRunCost("$ 14.50 / run");
            setMaxExecTime("12 mins");
            setStatus("Active");
            setXops("Commercial");

            setMetaWhereRead("source_system = 'SAP' AND region = 'NA'");
            setMetaJoinRead("INNER JOIN sales_data ON source.id = sales.id");
            setMetaFilterRead("amount > 1000");
        } else {
            setJiraId("");
            setEstRunCost("");
            setMaxExecTime("");
            setStatus("");
            setXops("");
            setMetaWhereRead("");
            setMetaJoinRead("");
            setMetaFilterRead("");

            setMetaWhereEdit("");
            setMetaJoinEdit("");
            setMetaFilterEdit("");
        }
    }, [demand, userRule]);

    const handleGenerateQuery = () => {
        if (demand) {
            setMetaWhereEdit("source_system = 'SAP' AND region = 'NA'\n-- Added custom condition\nAND active_status = true");
            setMetaJoinEdit("INNER JOIN sales_data ON source.id = sales.id\nLEFT JOIN regions ON sales.region_id = regions.id");
            setMetaFilterEdit("amount > 1000\nAND is_valid = 1");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, height: "100%", overflow: "hidden" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: 2,
                    flexShrink: 0
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={800}
                        letterSpacing="-0.5px"
                        color="text.primary"
                    >
                        Translator
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Button
                        variant="contained"
                        startIcon={<Settings size={18} />}
                        onClick={() => { }}
                    >
                        DevOps
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Activity size={18} />}
                        onClick={() => { }}
                    >
                        Change Status
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Send size={18} />}
                        onClick={() => { }}
                    >
                        Submit Rule
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={2} sx={{ flex: 1, overflow: "hidden" }}>
                {/* Left Column: Input and Execution Config */}
                <Grid size={{ xs: 12, md: 3 }} sx={{ height: "100%" }}>
                    <Card variant="outlined" sx={{ p: 2, height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <CustomSelectInput
                                    label="Select Demand"
                                    placeholder="Select Demand"
                                    options={[
                                        { label: "CD_Secondary Sales [2025]", value: "CD_Secondary Sales [2025]" },
                                        { label: "RTVA_Cordillera [351]", value: "RTVA_Cordillera [351]" },
                                        { label: "Finance_CDQ_BDL [287]", value: "Finance_CDQ_BDL [287]" },
                                        { label: "CD_CDQ_UDL [289]", value: "CD_CDQ_UDL [289]" },
                                        { label: "Marketing_CDQ_UDL [293]", value: "Marketing_CDQ_UDL [293]" },
                                        { label: "O2C_Overdues_Global [284]", value: "O2C_Overdues_Global [284]" },
                                        { label: "RTVA Fusion [304]", value: "RTVA Fusion [304]" }
                                    ]}
                                    value={demand}
                                    onChange={(value) => setDemand(value != null ? String(value) : "")}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <CustomSelectInput
                                    label="Select User Rule"
                                    placeholder="Select user rule"
                                    options={[
                                        { label: "Data Type Check [46296]", value: "Data Type Check [46296]" },
                                        { label: "Primary Key Check [50026]", value: "Primary Key Check [50026]" },
                                    ]}
                                    value={userRule}
                                    onChange={(value) => {
                                        setUserRule(value != null ? String(value) : "");
                                        if (value === "Data Type Check [46296]") {
                                            setRuleType("Data Type Check Custom");
                                        } else if (value === "Primary Key Check [50026]") {
                                            setRuleType("Primary Key Check Custom");
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <CustomTextInput
                                    label="Jira ID"
                                    placeholder="Jira ID"
                                    readOnly
                                    value={jiraId}
                                    onChange={(e) => setJiraId(e.target.value)}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <CustomSelectInput
                                    label="Change Rule Type"
                                    placeholder="Rule Type"
                                    options={[
                                        { label: "Data Type Check Custom", value: "Data Type Check Custom" },
                                        { label: "Primary Key Check Custom", value: "Primary Key Check Custom" },
                                    ]}
                                    value={ruleType}
                                    onChange={(value) => setRuleType(value != null ? String(value) : "")}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ height: "1px", bgcolor: "divider", mt: 1, mb: 1, mx: 1 }} />

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <CustomTextInput
                                    label="Estimated Run Cost"
                                    placeholder="Estimated Run Cost"
                                    value={estRunCost}
                                    onChange={(e) => setEstRunCost(e.target.value)}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <CustomTextInput
                                    label="Max Execution Time"
                                    placeholder="Max Execution Time"
                                    value={maxExecTime}
                                    onChange={(e) => setMaxExecTime(e.target.value)}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <CustomSelectInput
                                    label="Status"
                                    placeholder="Select Status"
                                    options={[
                                        { label: "Active", value: "Active" },
                                        { label: "Inactive", value: "Inactive" },
                                        { label: "Pending", value: "Pending" }
                                    ]}
                                    value={status}
                                    onChange={(value) => setStatus(value != null ? String(value) : "")}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                {/* Right Column: Metadata and Details */}
                <Grid size={{ xs: 12, md: 9 }} sx={{ height: "100%" }}>
                    <Card variant="outlined" sx={{ p: 0, height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }}>

                        {/* Sticky Action Topbar */}
                        <Box
                            sx={{
                                p: 1.5,
                                px: 2,
                                position: 'sticky',
                                top: 0,
                                zIndex: 10,
                                bgcolor: 'background.paper',
                                borderBottom: 1,
                                borderColor: 'divider',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: "wrap",
                                gap: 2
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
                                <Chip variant="outlined" label="Primary" color="primary" sx={{ borderRadius: 1, fontWeight: 700 }} />
                                <Chip variant="outlined" label="Object Key: TOB46861" sx={{ borderRadius: 1, fontWeight: 600 }} />
                                <Chip variant="outlined" label="Result Rule ID: 46815" sx={{ borderRadius: 1, fontWeight: 600 }} />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Play size={18} />}
                                    onClick={handleGenerateQuery}
                                    sx={(theme) => ({
                                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                                        boxShadow: `0 4px 6px ${theme.palette.primary.main}4D`,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: 3,
                                        py: 0.75,
                                        '&:hover': {
                                            background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                                        }
                                    })}
                                >
                                    Generate Query
                                </Button>
                                <CustomIconButton
                                    size="medium"
                                    title="Click here to Configure Rules"
                                    icon={<RefreshCcw fontSize="medium" />}
                                    onClick={() => { }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ p: 2 }}>
                            <Grid container spacing={2} rowSpacing={4} alignItems="center">
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="body2" fontWeight={600}>Following are Data Owner Inputs:</Typography>
                                </Grid>
                                <Grid size={{ xs: 3 }}>
                                    <CustomSelectInput
                                        label="Select XOps"
                                        placeholder="XOps"
                                        options={[
                                            { value: "Commercial", label: "Commercial" },
                                            { value: "Consumer", label: "Consumer" },
                                            { value: "Customer Development", label: "Customer Development" },
                                            { value: "Customer Operations", label: "Customer Operations" },
                                            { value: "People", label: "People" },
                                            { value: "Supply Chat & R&D", label: "Supply Chat & R&D" },
                                            { value: "Unknown", label: "Unknown" },
                                        ]}
                                        value={xops}
                                        onChange={(value) => setXops(value != null ? String(value) : "")}
                                    />
                                </Grid>
                                <Grid size={{ xs: 3 }}>
                                    <CustomSelectInput
                                        label="Object key 2"
                                        placeholder="Object key 2"
                                        disabled
                                        options={[]}
                                        value={undefined}
                                        onChange={() => { }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 3 }}>
                                    <CustomSelectInput
                                        label="Object key 3"
                                        placeholder="Object key 3"
                                        disabled
                                        options={[]}
                                        value={undefined}
                                        onChange={() => { }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 3 }}>
                                    <CustomSelectInput
                                        label="Object key 4"
                                        placeholder="Object key 4"
                                        disabled
                                        options={[]}
                                        value={undefined}
                                        onChange={() => { }}
                                    />
                                </Grid>


                                <Grid size={{ xs: 12 }}>
                                    <Grid spacing={40} container>
                                        <Grid size={{ xs: 6 }}>
                                            <CustomTextInput
                                                label="Metadata Where"
                                                placeholder="Not Available"
                                                multiline
                                                rows={5}
                                                value={metaWhereRead}
                                                readOnly
                                                onChange={() => { }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.MuiInputBase-multiline": { padding: "0px" },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <CustomTextInput
                                                label="Metadata Where"
                                                placeholder="Metadata Where"
                                                multiline
                                                rows={5}
                                                value={metaWhereEdit}
                                                onChange={(e) => setMetaWhereEdit(e.target.value)}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.MuiInputBase-multiline": { padding: "0px" },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Grid spacing={40} container>
                                        <Grid size={{ xs: 6 }}>
                                            <CustomTextInput
                                                label="Metadata Join"
                                                placeholder="Not Available"
                                                multiline
                                                rows={5}
                                                value={metaJoinRead}
                                                readOnly
                                                onChange={() => { }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.MuiInputBase-multiline": { padding: "0px" },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <CustomTextInput
                                                label="Metadata Join"
                                                placeholder="Metadata Join"
                                                multiline
                                                rows={5}
                                                value={metaJoinEdit}
                                                onChange={(e) => setMetaJoinEdit(e.target.value)}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.MuiInputBase-multiline": { padding: "0px" },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Grid spacing={40} container>
                                        <Grid size={{ xs: 6 }}>
                                            <CustomTextInput
                                                label="Metadata Filter"
                                                placeholder="Not Available"
                                                multiline
                                                rows={5}
                                                value={metaFilterRead}
                                                readOnly
                                                onChange={() => { }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.MuiInputBase-multiline": { padding: "0px" },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <CustomTextInput
                                                label="Advanced Filters"
                                                placeholder="Advanced Filters"
                                                multiline
                                                rows={5}
                                                value={metaFilterEdit}
                                                onChange={(e) => setMetaFilterEdit(e.target.value)}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                                        "&.MuiInputBase-multiline": { padding: "0px" },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Translator;