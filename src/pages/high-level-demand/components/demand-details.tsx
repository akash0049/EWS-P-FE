import { useState, useEffect } from "react";
import { Box, Drawer, Typography, Button, Divider, Link } from "@mui/material";
import CustomSelectInput from "../../../components/inputs/select-input/select-input";
import CustomTextInput from "../../../components/inputs/text-input/text-input";
import CustomSnackbar from "../../../components/snackbar/custom-snackbar";

interface Props {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
}

const JIRA_ID_LIST = [
    { value: "DDA-890", label: "DDA-890" },
    { value: "DDA-1024", label: "DDA-1024" },
    { value: "DDA-3465", label: "DDA-3465" },
];

const USERS_LIST = [
    { value: "u1", label: "Akash Mahajan" },
    { value: "u2", label: "John Doe" },
    { value: "u3", label: "Jane Smith" },
    { value: "u4", label: "Alice Johnson" },
    { value: "u5", label: "Bob Brown" },
    { value: "u6", label: "Charlie Davis" },
    { value: "u7", label: "Diana Evans" },
    { value: "u8", label: "Ethan Foster" },
];

const DemandDetails = ({ open, toggleDrawer }: Props) => {
    const [jiraId, setJiraId] = useState("");
    const [jiraDescription, setJiraDescription] = useState("");
    const [demandDescription, setDemandDescription] = useState("");
    const [market, setMarket] = useState("");
    const [usecase, setUsecase] = useState("");
    const [benefits, setBenefits] = useState("");
    const [demandOwner, setDemandOwner] = useState("");
    const [demandSPOC, setDemandSPOC] = useState("");
    const [functionalSME, setFunctionalSME] = useState("");
    const [resolverGroupName, setResolverGroupName] = useState("");
    const [userGroup, setUserGroup] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (jiraId === "DDA-890") {
            setJiraDescription("Implement new backend services for demand processing.");
        } else if (jiraId === "DDA-1024") {
            setJiraDescription("Fix UI bugs in the demand details drawer.");
        } else if (jiraId === "DDA-3465") {
            setJiraDescription("Update database schema for high-level demands.");
        } else {
            setJiraDescription("");
        }
    }, [jiraId]);

    useEffect(() => {
        if (resolverGroupName) {
            setUserGroup(`${resolverGroupName}_Users`);
        } else {
            setUserGroup("");
        }
    }, [resolverGroupName]);

    const handleSave = () => {
        if (!jiraId || !demandDescription || !market || !usecase || !benefits || !demandOwner || !demandSPOC || !functionalSME || !resolverGroupName) {
            setShowError(true);
            return;
        }

        const payload = {
            jiraId,
            jiraDescription,
            demandDescription,
            market,
            usecase,
            benefits,
            demandOwner,
            demandSPOC,
            functionalSME,
            resolverGroupName,
            userGroup
        };
        console.log("Saving Demand Details:", payload);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            toggleDrawer(false);
        }, 1500);
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={(_event, reason) => {
                if (reason === "backdropClick") return; // prevent close on outside click
                toggleDrawer(false);
            }}
            sx={{
                zIndex: 9999,
                "& .MuiDrawer-paper": {
                    width: 600,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                },
            }}
        >
            <Box sx={{
                px: 2,
                py: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0
            }}>
                <Box>
                    <Typography variant="subtitle1" fontWeight={800} letterSpacing="-0.5px" color="text.primary">
                        Demand Details
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                        Demand: Net_Productivity [372]
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
                        onClick={() => toggleDrawer(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>

            </Box>
            <Divider sx={{ mx: 1 }} />

            <Box sx={{
                py: 2,
                px: 3,
                display: "flex",
                flexDirection: 'column',
                gap: 2,
                overflowY: "auto",
                flex: 1
            }}>
                <Link
                    href="#"
                    underline="hover"
                    sx={{
                        color: "primary.main",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: '0.8rem'
                    }}
                >
                    Click here to add more details by Engagement Team
                </Link>

                <CustomSelectInput
                    label="JIRA ID"
                    placeholder="Select a JIRA ID"
                    required
                    options={JIRA_ID_LIST}
                    value={jiraId}
                    onChange={(value) => setJiraId(value != null ? String(value) : "")}
                />

                <CustomTextInput
                    label="JIRA Description"
                    placeholder="Enter JIRA Description"
                    value={jiraDescription}
                    onChange={(e) => setJiraDescription(e.target.value)}
                    multiline
                    rows={2}
                    readOnly
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#f8fafc",
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                        },
                    }}
                />

                <CustomTextInput
                    label="Demand Description"
                    placeholder="Enter Demand Description"
                    required
                    value={demandDescription}
                    onChange={(e) => setDemandDescription(e.target.value)}
                    multiline
                    rows={2}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#f8fafc",
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                        },
                    }}
                />

                <CustomTextInput
                    label="Market"
                    placeholder="Enter Market"
                    required
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#f8fafc",
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                        },
                    }}
                />

                <CustomTextInput
                    label="Use Case"
                    placeholder="Enter Use Case"
                    required
                    value={usecase}
                    onChange={(e) => setUsecase(e.target.value)}
                    multiline
                    rows={2}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#f8fafc",
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                        },
                    }}
                />

                <CustomTextInput
                    label="Benefits"
                    placeholder="Enter Benefits"
                    required
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    multiline
                    rows={2}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#f8fafc",
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                        },
                    }}
                />

                <CustomSelectInput
                    label="Demand Owner"
                    placeholder="Select a Demand Owner"
                    required
                    options={USERS_LIST}
                    value={demandOwner}
                    onChange={(value) => setDemandOwner(value != null ? String(value) : "")}
                />

                <CustomSelectInput
                    label="Demand SPOC"
                    placeholder="Select a Demand SPOC"
                    required
                    options={USERS_LIST}
                    value={demandSPOC}
                    onChange={(value) => setDemandSPOC(value != null ? String(value) : "")}
                />

                <CustomSelectInput
                    label="Function SME"
                    placeholder="Select a Function SME"
                    required
                    options={USERS_LIST}
                    value={functionalSME}
                    onChange={(value) => setFunctionalSME(value != null ? String(value) : "")}
                />

                <CustomTextInput
                    label="Resolver Group Name"
                    placeholder="Enter Resolver Group Name"
                    required
                    value={resolverGroupName}
                    onChange={(e) => setResolverGroupName(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#f8fafc",
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                        },
                    }}
                />

                <CustomTextInput
                    label="User Group"
                    placeholder="Enter User Group"
                    required
                    value={userGroup}
                    onChange={(e) => setUserGroup(e.target.value)}
                    readOnly
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#f8fafc",
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                        },
                    }}
                />
            </Box>

            <CustomSnackbar
                open={showSuccess}
                message="Demand Details saved successfully!"
                severity="success"
                onClose={() => setShowSuccess(false)}
            />
            <CustomSnackbar
                open={showError}
                message="Please fill in all required fields before saving."
                severity="error"
                autoHideDuration={4000}
                onClose={() => setShowError(false)}
            />
        </Drawer>

    );
};

export default DemandDetails;