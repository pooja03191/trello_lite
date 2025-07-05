import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BoardPage from './pages/BoardPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/board/:id" element={<BoardPage />} />
      </Routes>
    </div>
  );
}
