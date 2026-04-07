import './App.css';
import AppRouter from './routes/router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './config/auth-config';

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </MsalProvider>
  );
}

export default App;
