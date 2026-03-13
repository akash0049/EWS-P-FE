import {
    Box,
    Typography,
} from "@mui/material";

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
                        Translator
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25 }}>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Annexure