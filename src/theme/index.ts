import { createTheme } from '@mui/material/styles';
import { MuiButton } from './overrides/button';

const theme = createTheme({
    palette: {
        primary: {
            // dark: "#001F82",
            dark: "#0033CC",
            main: "#005EEF",
            light: "#00B2FF",
        },
        secondary: {
            main: "#404040",
            light: "#8C8C8C"
        },
        error: {
            dark: '#FF2828',
            main: '#FF544F',
            light: '#FF7C7D',
        },
        success: {
            dark: '#008651',
            main: '#00B190',
            light: '#00D7C4',
        },
    },
    typography: {
        fontFamily: "Unilever Desire",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        subtitle1: { fontWeight: 400 },
        subtitle2: { fontWeight: 400 },
        body1: { fontWeight: 400 },
        body2: { fontWeight: 400 },
        button: {
            fontSize: 'clamp(9px, 11px, 13px)',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton
    },
});

export default theme;

