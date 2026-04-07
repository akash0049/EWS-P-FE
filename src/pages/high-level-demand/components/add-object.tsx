import { useState } from 'react';
import {
    Grid,
    Card,
    Box,
    Alert,
    Typography
} from "@mui/material";
import CustomSelectInput from "../../../components/inputs/select-input/select-input";
import { XOPS_LIST, OBJECT_LIST } from "../constants/data";

interface AddObjectProps {
    onAddObject?: (obj: any) => void;
}

const AddObject = ({ onAddObject }: AddObjectProps) => {
    const [xops, setXops] = useState("");
    const [objectName, setObjectName] = useState("");

    return (
        <Card variant="outlined" sx={{ p: 2, height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: 'space-between', gap: 2 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <CustomSelectInput
                        label="XOps"
                        placeholder="Select a xops"
                        options={XOPS_LIST}
                        value={xops}
                        onChange={(value) => setXops(value as string)}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <CustomSelectInput
                        label="Object Name"
                        placeholder="Select an object name"
                        description='Selecting an object will automatically add it to the object table.'
                        options={OBJECT_LIST}
                        value={objectName}
                        onChange={(value) => {
                            const valStr = value as string;
                            setObjectName(valStr);
                            if (valStr && onAddObject) {
                                // Extract key from format like "Account[SOB52770]Carelines Consumer"
                                const match = valStr.match(/\[(.*?)\]/);
                                const objectKey = match ? match[1] : valStr;
                                const name = valStr.replace(/\[.*?\]/, "").trim();

                                onAddObject({
                                    objectKey,
                                    objectName: name,
                                    objectPath: `[BDLMOUNT]/BusinessDataLake/.../${name.replace(/\s+/g, '')}`,
                                    metadata: "Y",
                                });
                                // Optional: clear selection after adding
                                setTimeout(() => setObjectName(""), 0);
                            }
                        }}
                    />
                </Grid>
            </Grid>

            <Box mt={0} display="flex" flexDirection="column" gap={0}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                    borderColor="divider"
                >
                    <Alert
                        severity="warning"
                        icon={false}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "warning.light",
                            backgroundColor: "rgba(255, 244, 229, 0.6)",
                            px: 1,
                            py: 0
                        }}
                    >
                        <Typography variant="caption" color="warning.dark">
                            <strong>Note:</strong> Rules Created on objects with Metadata flag 'N'
                            will not be able to submit for translator unless the issue in metadata are fixed.
                        </Typography>
                    </Alert>
                </Box>
            </Box>
        </Card>
    );
}

export default AddObject;