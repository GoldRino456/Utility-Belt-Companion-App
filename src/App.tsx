import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import GameLog from './pages/GameLog';
import Generator from './pages/Generator';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/games" element={<GameLog />} />
                    <Route path="/generator" element={<Generator />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/settings" element={<Settings />} />
                    {/* Catch all - redirect to dashboard */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;