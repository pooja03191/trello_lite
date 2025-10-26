import { Link } from "react-router-dom";
import { useBoard } from "../context/BoardContext";

export default function BoardList() {
    const { boards } = useBoard();

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Your Boards</h1>

            <div className="grid">
                {Object.values(boards).map(board => (
                    <Link
                        key={board.id}
                        to={`/dashboard/${board.id}`}
                        className="p-4 rounded-lg shadow bg-white hover:bg-gray-100 text-xl font-semibold"
                    >
                        {board.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
