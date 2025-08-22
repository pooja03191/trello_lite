import { Routes, Route } from 'react-router-dom';
import BoardList from '../components/BoardList';
import Board from '../components/Board';

export default function Dashboard() {
    return (
        <Routes>
            {/* Board List (default route) */}
            <Route path="/" element={<BoardList />} />

            {/* Single Board View */}
            <Route path=":boardId" element={<Board />} />
        </Routes>
    );
}