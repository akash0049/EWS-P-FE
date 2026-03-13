import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { FileText, Languages, BookOpen, ChevronsLeft, ChevronsRight, ScrollText } from 'lucide-react';

export const DRAWER_WIDTH = 220;
export const DRAWER_COLLAPSED_WIDTH = 60;

const navItems = [
    { label: 'Demands', icon: <FileText size={19} />, id: 'demands', path: '/' },
    { label: 'Translator', icon: <Languages size={19} />, id: 'translator', path: '/translator' },
    { label: 'Annexure', icon: <ScrollText size={19} />, id: 'annexure', path: '/annexure' },
    // { label: 'User Manual', icon: <BookOpen size={19} />, id: 'user-manual', path: '/' },
];

const navButtonSx = (isActive: boolean, collapsed: boolean) => ({
    borderRadius: '10px',
    py: 1.1,
    px: 0.5,
    justifyContent: collapsed ? 'center' : 'flex-start',
    minWidth: 0,
    transition: 'all 0.18s ease',
    color: isActive ? 'primary.main' : 'text.secondary',
    bgcolor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
    '&:hover': {
        bgcolor: isActive ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0,0,0,0.05)',
        color: isActive ? 'primary.main' : 'text.primary',
    },
    '&.Mui-selected': {
        bgcolor: 'rgba(25, 118, 210, 0.08)',
        '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.12)' },
    },
    position: 'relative',
    // '&::before': isActive
    //     ? {
    //         content: '""',
    //         position: 'absolute',
    //         left: -6,
    //         top: '20%',
    //         height: '60%',
    //         width: 3,
    //         borderRadius: '0 3px 3px 0',
    //         bgcolor: 'primary.main',
    //     }
    //     : {},
});

export default function Sidebar() {
    const navigate = useNavigate();

    const [activeId, setActiveId] = useState<string>('demands');
    const [collapsed, setCollapsed] = useState(true);

    const handleToggle = () => {
        const next = !collapsed;
        setCollapsed(next);
    };

    const drawerWidth = collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                transition: 'width 0.25s ease',
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: '#FFFFFF',
                    borderRight: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
                    overflowX: 'hidden',
                    transition: 'width 0.25s ease',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            {/* Spacer — sits below the fixed Navbar */}
            <Toolbar variant="dense" sx={{ minHeight: 48 }} />

            {/* ── Main nav items ── */}
            <List disablePadding sx={{ mt: 2, px: collapsed ? 0.5 : 1.5, flexGrow: 1 }}>
                {navItems.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                            <Tooltip title={collapsed ? item.label : ''} placement="right" arrow>
                                <ListItemButton
                                    selected={isActive}
                                    onClick={() => {
                                        setActiveId(item.id);
                                        navigate(item.path);
                                    }}
                                    sx={navButtonSx(isActive, collapsed)}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: collapsed ? 0 : 36,
                                            color: isActive ? 'primary.main' : 'text.disabled',
                                            transition: 'color 0.18s ease',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {!collapsed && (
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontSize: '0.875rem',
                                                fontWeight: isActive ? 600 : 500,
                                                letterSpacing: '0.1px',
                                                noWrap: true,
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    );
                })}
            </List>

            {/* ── Collapse / expand toggle — part of the nav, pinned at bottom ── */}
            <Box sx={{ px: collapsed ? 0.5 : 1.5, pb: 1.5 }}>
                <Divider sx={{ mb: 1, opacity: 0.5 }} />
                <Tooltip
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    placement="right"
                    arrow
                >
                    <ListItemButton
                        onClick={handleToggle}
                        sx={{
                            borderRadius: '10px',
                            py: 1.1,
                            px: 1.5,
                            justifyContent: 'center',
                            minWidth: 0,
                            transition: 'all 0.18s ease',
                            color: 'primary.main',
                            '&:hover': {
                                bgcolor: 'rgba(25, 118, 210, 0.16)',
                                color: 'primary.dark',
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                color: 'inherit',
                                justifyContent: 'center',
                            }}
                        >
                            {collapsed
                                ? <ChevronsRight size={20} />
                                : <ChevronsLeft size={20} />
                            }
                        </ListItemIcon>
                    </ListItemButton>
                </Tooltip>
            </Box>
        </Drawer>
    );
}
