import { Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";

interface CustomSnackbarProps {
    open: boolean;
    message: string;
    severity?: AlertColor;
    autoHideDuration?: number;
    onClose: () => void;
}

const CustomSnackbar = ({
    open,
    message,
    severity = "success",
    autoHideDuration = 3000,
    onClose
}: CustomSnackbarProps) => {
    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={autoHideDuration}
            onClose={(_, reason) => {
                if (reason === 'clickaway') return;
                onClose();
            }}
        >
            <Alert
                severity={severity}
                variant="filled"
                onClose={onClose}
                sx={{ width: '100%', color: 'white', fontWeight: 500 }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
