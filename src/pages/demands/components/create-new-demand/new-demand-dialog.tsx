import { useState } from "react";
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from "@mui/material";
import {
    CirclePlus,
    UserCog,
    X
} from "lucide-react";
import CustomTabs from "../../../../components/tabs/custom-tabs";
import CreateNewDemand from "./create-new-demand";
import ManageUserGroups from "./manage-user-groups";

/* ── Dialog Props ── */
interface NewDemandDialogProps {
    open: boolean;
    onClose: () => void;
}

const NewDemandDialog = ({ open, onClose }: NewDemandDialogProps) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                        Create New Demand
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                        New Demand to be created by DQ Engagement Team
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        mt: 0,
                        color: "text.secondary",
                        borderRadius: 1.5,
                        "&:hover": { bgcolor: "action.hover" },
                    }}
                >
                    <X size={18} />
                </IconButton>
            </DialogTitle>

            {/* ── Dialog Content ── */}
            <DialogContent sx={{ mx: 2, mt: 1 }}>
                <CustomTabs
                    value={activeTab}
                    onChange={handleChange}
                    tabs={[
                        { label: "New Demand", icon: <CirclePlus size={12} /> },
                        { label: "Manage User Groups", icon: <UserCog size={12} /> },
                    ]}
                />
                {activeTab === 0 && <CreateNewDemand />}
                {activeTab === 1 && <ManageUserGroups />}
            </DialogContent>
        </Dialog>
    );
};

export default NewDemandDialog;