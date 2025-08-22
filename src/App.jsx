import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Dashboard routes */}
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}