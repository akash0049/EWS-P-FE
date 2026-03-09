import { useState } from "react";
import { Box, Button } from "@mui/material";
import CustomTextInput from "../../../../components/inputs/text-input/text-input";

const PRIMARY = "#0d7ff2";

export default function NewDemandForm() {
    const [demandName, setDemandName] = useState("");
    const [userGroup, setUserGroup] = useState("");
    const [groupEmail, setGroupEmail] = useState("");

    return (
        <Box
            sx={{
                px: 6,
                py: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        pb: 1.5,
                        borderBottom: "1px solid #e2e8f0",
                    }}
                >
                    <ListAltIcon sx={{ color: PRIMARY, fontSize: 22 }} />

                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: 18,
                            color: "#0f172a",
                        }}
                    >
                        Demand Details
                    </Typography>
                </Box> */}

                {/* Form Fields */}
                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Project Demand Name */}
                    <CustomTextInput
                        label="Project Demand Name"
                        placeholder="Enter demand name"
                        required

                        value={demandName}
                        onChange={(e) => setDemandName(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                bgcolor: "#f8fafc",
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                            },
                        }}
                    />

                    <CustomTextInput
                        label="User Group"
                        placeholder="Enter user group"
                        required

                        value={userGroup}
                        onChange={(e) => setUserGroup(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                bgcolor: "#f8fafc",
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                            },
                        }}
                    />
                    <CustomTextInput
                        label="Group Email"
                        placeholder="example@company.com"
                        description="By providing this email, you will receive notifications regarding this demand."
                        type="email"
                        value={groupEmail}
                        onChange={(e) => setGroupEmail(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                bgcolor: "#f8fafc",
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
                            },
                        }}
                    />
                </Box>
            </Box>

            <Button
                variant="contained"
                sx={{
                    mt: 1,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    bgcolor: PRIMARY,
                    "&:hover": { bgcolor: `${PRIMARY}E6` },
                    boxShadow: "none",
                }}
            >
                Create Demand
            </Button>
        </Box>
    );
}