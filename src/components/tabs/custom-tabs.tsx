import React from "react";
import { Tabs, Tab } from "@mui/material";

interface TabItem {
    label: string;
    icon?: React.ReactElement;
}

interface CustomTabsProps {
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    tabs: TabItem[];
}

const CustomTabs: React.FC<CustomTabsProps> = ({
    value,
    onChange,
    tabs = [],
}) => {
    return (
        <Tabs
            value={value}
            variant="fullWidth"
            onChange={onChange}
            sx={{
                borderBottom: "1px solid #e5e7eb",
                minHeight: "20px",

                "& .MuiTabs-indicator": {
                    height: "2px",
                    backgroundColor: "#1a73e8",
                },
            }}
        >
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    icon={tab.icon}
                    iconPosition="start"
                    label={tab.label}
                    disableRipple
                    sx={{
                        textTransform: "none",
                        fontSize: "12px",
                        fontWeight: 500,
                        minHeight: "20px",
                        padding: "8px 16px",
                        color: "#64748b",

                        "& .MuiTab-iconWrapper": {
                            marginRight: "6px",
                        },

                        "&.Mui-selected": {
                            color: "#1a73e8",
                            fontWeight: 600,
                        },
                    }}
                />
            ))}
        </Tabs>
    );
};

export default CustomTabs;
