import { Routes, Route, BrowserRouter } from 'react-router-dom';

import AppLayout from '../components/layout/layout';
import Demands from '../pages/demands/demands';
import HighLevelDemand from '../pages/high-level-demand/high-level-demand';
import UserRule from '../pages/user-rule/user-rule';
import Translator from '../pages/translator/translator';
import Annexure from '../pages/annexure/annexure';

import { APP_ROUTES } from './app-routes';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={APP_ROUTES.DEMANDS} element={<AppLayout />}>
                    <Route index element={<Demands />} />
                    <Route path={APP_ROUTES.HIGH_LEVEL_DEMAND} element={<HighLevelDemand />} />
                    <Route path={APP_ROUTES.USER_RULE} element={<UserRule />} />
                    <Route path={APP_ROUTES.TRANSLATOR} element={<Translator />} />
                    <Route path={APP_ROUTES.ANNEXURE} element={<Annexure />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
