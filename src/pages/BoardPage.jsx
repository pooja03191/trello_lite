import { useParams, Link } from 'react-router-dom';

export default function BoardPage() {
    const { id } = useParams();

    return (
        <div className="p-4">
            <Link to="/" className="text-blue-500 underline">← Back to Boards</Link>
            <h1 className="text-2xl font-bold mt-4">Board {id}</h1>

            <div className="mt-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white p-4 rounded shadow">
                    <h2 className="font-bold mb-2">To Do</h2>
                    {/* Tasks go here */}
                </div>
                <div className="flex-1 bg-white p-4 rounded shadow">
                    <h2 className="font-bold mb-2">In Progress</h2>
                </div>
                <div className="flex-1 bg-white p-4 rounded shadow">
                    <h2 className="font-bold mb-2">Done</h2>
                </div>
            </div>
        </div>
    );
}
