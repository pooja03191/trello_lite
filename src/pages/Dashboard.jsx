import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="p-4">
            <h1 className="text-3xl text-black font-bold mb-4">Trello Lite - My Boards</h1>

            <div className="space-y-2">
                <div className="p-4 bg-white rounded shadow">
                    <Link to="/board/1" className="text-blue-500 underline">Board 1</Link>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <Link to="/board/2" className="text-blue-500 underline">Board 2</Link>
                </div>
            </div>
        </div>
    );
}
