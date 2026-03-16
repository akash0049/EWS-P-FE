import { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Card,
    Button
} from "@mui/material";
import CustomSelectInput from "../../components/inputs/select-input/select-input";
import CustomTextInput from "../../components/inputs/text-input/text-input";
import CustomIconButton from "../../components/buttons/icon-button/icon-button";
import { RefreshCcw } from "lucide-react";

const Translator = () => {
    const [demand, setDemand] = useState<string>("");
    const [userRule, setUserRule] = useState<string>("");
    const [jiraId, setJiraId] = useState<string>("");
    const [ruleType, setRuleType] = useState<string>("");
    const [xops, setXops] = useState<string>("");
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
                        Translator
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <Button
                        variant="contained"
                        onClick={() => { }}
                    >
                        DevOps
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => { }}
                    >
                        Change Status
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => { }}
                    >
                        Submit Rule
                    </Button>
                </Box>
            </Box>

            <Card variant="outlined" sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 3 }}>
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
                    <Grid size={{ xs: 3 }}>
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
                    <Grid size={{ xs: 3 }}>
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
                    <Grid size={{ xs: 3 }}>
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
            </Card>
            <Card variant="outlined" sx={{ p: 2, flex: 1, overflowY: "auto" }}>
                <Grid container spacing={2} rowSpacing={4} alignItems="center">
                    <Grid size={{ xs: 4 }}>
                        <Button variant="contained">Primary</Button>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <Typography variant="body2" fontWeight={600}>Object Key: TOB46861</Typography>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <Typography variant="body2" fontWeight={600}>Result Rule ID: 46815</Typography>
                    </Grid>
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
                                    rows={6}
                                    value={undefined}
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
                                    rows={6}
                                    value={undefined}
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
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Grid spacing={40} container>
                            <Grid size={{ xs: 6 }}>
                                <CustomTextInput
                                    label="Metadata Join"
                                    placeholder="Not Available"
                                    multiline
                                    rows={6}
                                    value={undefined}
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
                                    rows={6}
                                    value={undefined}
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
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Grid spacing={40} container>
                            <Grid size={{ xs: 6 }}>
                                <CustomTextInput
                                    label="Metadata Filter"
                                    placeholder="Not Available"
                                    multiline
                                    rows={6}
                                    value={undefined}
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
                                    rows={6}
                                    value={undefined}
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
                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 12 }} display={'flex'} alignItems={'center'} gap={1}>
                        <Button
                            variant="contained"
                            onClick={() => { }}
                        >
                            Generate Query
                        </Button>

                        <CustomIconButton
                            title="Click here to Configure Rules"
                            icon={<RefreshCcw fontSize="medium" />}
                            onClick={() => { }}
                        />
                    </Grid>
                </Grid>
            </Card>

            <Card variant="outlined" sx={{ p: 2 }}>
                <Grid container spacing={2} rowSpacing={4} alignItems="center">
                    <Grid size={{ xs: 4 }}>
                        <CustomTextInput
                            label="Estimated Run Cost"
                            placeholder="Estimated Run Cost"
                            value={undefined}
                            onChange={() => { }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <CustomTextInput
                            label="Max Execution Time"
                            placeholder="Max Execution Time"
                            value={undefined}
                            onChange={() => { }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <CustomSelectInput
                            label="Status"
                            placeholder="Select Status"
                            options={[]}
                            value={undefined}
                            onChange={() => { }}
                        />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

export default Translator;