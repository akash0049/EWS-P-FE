import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import GDTLogo from '../../../assets/GDT With Grey Backgroud.png';
import { LogOutIcon } from 'lucide-react';

const user = {
    _name: 'Akash',
    get name() {
        return this._name;
    },
    set name(value) {
        this._name = value;
    },
    email: 'akash.mahajan@unilever.com',
    avatarInitials: 'AM',
};

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: '#0033CC',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar variant="dense" sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 }, maxHeight: 0, pl: { xs: 0, sm: 0 }, py: 0 }}>

                {/* ── GDT Logo (flush left, full height) ── */}

                {/* ── Left: Logo + App Name ── */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box
                        component="img"
                        src={GDTLogo}
                        alt="GDT Logo"
                        sx={{
                            height: '54px',
                            width: 'auto',
                            display: 'block',
                        }}
                    />
                    <Box>
                        <Typography
                            noWrap
                            sx={{
                                fontWeight: 700,
                                color: '#fff',
                                letterSpacing: '0.5px',
                                lineHeight: 1.1,
                                fontSize: '1.2rem',
                            }}
                        >
                            Early Warning System
                        </Typography>
                    </Box>
                </Box>

                {/* ── Right: User Profile ── */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                        <Typography
                            sx={{ color: '#fff', fontWeight: 500, lineHeight: 1.2, fontSize: '0.75rem' }}
                        >
                            Welcome, {user.name}
                        </Typography>
                    </Box>

                    <Tooltip title="Account settings" arrow>
                        <IconButton
                            onClick={handleOpen}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{
                                p: 0.3,
                                borderRadius: '50%',
                                transition: 'border-color 0.2s',
                                '&:hover': { borderColor: '#fff' },
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 30,
                                    height: 30,
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                }}
                            >
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* ── Dropdown Menu ── */}
                <Menu
                    id="account-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 4,
                            sx: {
                                mt: 1.5,
                                minWidth: 220,
                                borderRadius: '12px',
                                overflow: 'visible',
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 16,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ px: 2, py: 0 }}>
                        <Typography variant="caption" color="text.secondary">
                            {user.email}
                        </Typography>
                    </Box>
                    <Divider sx={{ m: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0 }}>
                        <Box>
                            <LogOutIcon size={12} color="red" />
                        </Box>
                        <Typography variant="caption" color="red">
                            Logout
                        </Typography>
                    </Box>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
