import { useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Link,
    Paper,
    TableContainer
} from "@mui/material";
import CustomSelectInput from "../../../../components/inputs/select-input/select-input";

import { PowerOff, RefreshCw } from "lucide-react";

const PRIMARY = "#0d7ff2";
/* ── User group options ── */
const USER_GROUP_OPTIONS = [
    { value: "admin", label: "Administrators" },
    { value: "dev", label: "Developers" },
    { value: "qa", label: "QA Team" },
    { value: "analyst", label: "Data Analysts" },
];

/* ── Available Users to Add ── */
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

export default function ManageUserGroups() {
    const [selectedGroup, setSelectedGroup] = useState("");
    const [usersInGroup, setUsersInGroup] = useState<typeof USERS_LIST>([]);

    return (
        <Box sx={{
            px: 4,
            pt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>

            <CustomSelectInput
                label="User Group"
                placeholder="Select a user group"
                description="Please select a user group to manage it."
                options={USER_GROUP_OPTIONS}
                value={selectedGroup}
                onChange={(value) => setSelectedGroup(value != null ? String(value) : "")}
            />

            {selectedGroup && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TableContainer
                        component={Paper}
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            overflow: "auto",
                            maxHeight: 250,
                        }}
                    >
                        <Table size="small">
                            <TableHead sx={{ position: "sticky", top: 0, zIndex: 1, bgcolor: "#f8fafc" }}>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: "#f8fafc",
                                            color: "text.secondary"
                                        }}
                                    >
                                        Name
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: "#f8fafc",
                                            color: "text.secondary",
                                            width: 100
                                        }}
                                    >
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {USERS_LIST.map((user) => {
                                    const isAdded = usersInGroup.some(
                                        (u) => u.value === user.value
                                    );

                                    return (
                                        <TableRow key={user.value}>
                                            <TableCell
                                                sx={{
                                                    color: "text.primary",
                                                    fontWeight: 500
                                                }}
                                            >
                                                {user.label}
                                            </TableCell>

                                            <TableCell align="right">
                                                <Button
                                                    size="small"
                                                    variant={isAdded ? "outlined" : "contained"}
                                                    color={isAdded ? "error" : "primary"}
                                                    onClick={() => {
                                                        if (isAdded) {
                                                            setUsersInGroup(
                                                                usersInGroup.filter(
                                                                    (u) => u.value !== user.value
                                                                )
                                                            );
                                                        } else {
                                                            setUsersInGroup([
                                                                ...usersInGroup,
                                                                user
                                                            ]);
                                                        }
                                                    }}
                                                    sx={{
                                                        borderRadius: 1.5,
                                                        textTransform: "none",
                                                        fontWeight: 600,
                                                        boxShadow: "none",
                                                        "&:hover": { boxShadow: "none" }
                                                    }}
                                                >
                                                    {isAdded ? "Remove" : "Add"}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            <Box
                sx={{
                    mt: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    pt: 1,
                }}
            >
                <Link
                    href="#"
                    underline="hover"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: PRIMARY,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                    }}
                >
                    <PowerOff size={16} />
                    Click here to deactivate bulk live rules.
                </Link>

                <Link
                    href="#"
                    underline="hover"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: PRIMARY,
                        fontSize: "0.8rem",
                        fontWeight: 500,
                    }}
                >
                    <RefreshCw size={16} />
                    Click here to update rule status.
                </Link>
            </Box>
        </Box>
    );
}
