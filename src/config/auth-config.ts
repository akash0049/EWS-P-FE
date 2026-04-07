import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
    tenant: import.meta.env.VITE_APP_TENANT_ID as string,
    auth: {
        clientId: import.meta.env.VITE_APP_CLIENT_ID as string,
        authority: import.meta.env.VITE_APP_AUTHORITY as string, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
        redirectUri: import.meta.env.VITE_APP_REDIRECT_URL as string
    }
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const tokenScopes = {
    scopes: [import.meta.env.VITE_APP_API_SCOPE as string]
}

export const loginRequest = {
    scopes: []
};

export const userDetailsRequest = {
    scopes: [
        "https://graph.microsoft.com/User.Read"
    ]
};
