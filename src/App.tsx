import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import AppLayout from './components/layout/layout';
import Demands from './pages/demands/demands';
import HighLevelDemand from './pages/high-level-demand/high-level-demand';
import UserRule from './pages/user-rule/user-rule';
import Translator from './pages/translator/translator';
import Annexure from './pages/annexure/annexure';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Demands />} />
          <Route path="/:demandId/high-level-demand" element={<HighLevelDemand />} />
          <Route path="/:demandId/user-rule" element={<UserRule />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/annexure" element={<Annexure />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
