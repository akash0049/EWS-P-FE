import { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from '../config/auth-config';

import AppLayout from '../components/layout/layout';
import Demands from '../pages/demands/demands';
import HighLevelDemand from '../pages/high-level-demand/high-level-demand';
import UserRule from '../pages/user-rule/user-rule';
import Translator from '../pages/translator/translator';
import Annexure from '../pages/annexure/annexure';

import { APP_ROUTES } from './app-routes';

function AppRouter() {
    const { instance, accounts, inProgress } = useMsal();

    const handleSSOLogin = async () => {
        try {
            await instance.loginRedirect(loginRequest);
        } catch (error) {
            console.error(`SSO Login Request Failed: ${error}`);
        }
    }

    // useEffect(() => {
    //     if (inProgress === InteractionStatus.None && accounts.length === 0) {
    //         handleSSOLogin();
    //     }
    // }, [inProgress, accounts]);

    return (
        <BrowserRouter>
            {/* <AuthenticatedTemplate> */}
            <Routes>
                <Route path={APP_ROUTES.DEMANDS} element={<AppLayout />}>
                    <Route index element={<Demands />} />
                    <Route path={APP_ROUTES.HIGH_LEVEL_DEMAND} element={<HighLevelDemand />} />
                    <Route path={APP_ROUTES.USER_RULE} element={<UserRule />} />
                    <Route path={APP_ROUTES.TRANSLATOR} element={<Translator />} />
                    <Route path={APP_ROUTES.ANNEXURE} element={<Annexure />} />
                </Route>
            </Routes>
            {/* </AuthenticatedTemplate> */}
        </BrowserRouter>
    );
}

export default AppRouter;
