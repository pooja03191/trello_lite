import { useParams, Link } from 'react-router-dom';
import Column from '../components/Column';
import { useState } from 'react';

const initialTasks = {
    todo: [{ title: 'Task A' }],
    inProgress: [{ title: 'Task B' }],
    done: [{ title: 'Task C' }],
};

export default function BoardPage() {
    const { id } = useParams();
    const [tasks, setTasks] = useState(initialTasks);

    return (
        <div className="p-4">
            <Link to="/" className="text-blue-500 underline">← Back to Boards</Link>
            <h1 className="text-2xl text-black text-center font-bold mt-4">Board {id}</h1>

            <div className="mt-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-gray-200 p-4 rounded shadow">
                    <Column
                        title="To Do"
                        tasks={tasks.todo}
                        onAddTasks={() =>
                            setTasks((prev) => ({
                                ...prev,
                                todo: [...prev.todo, { title: `New Task ${prev.todo.length + 1}` }],
                            }))
                        }
                    />
                </div>
                <div className="flex-1 bg-gray-200 p-4 rounded shadow">
                    <Column
                        title="In Progress"
                        tasks={tasks.inProgress}
                        onAddTasks={() => console.log("Add Task is clicked")}
                    />
                </div>
                <div className="flex-1 bg-gray-200 p-4 rounded shadow">
                    <Column
                        title="Done"
                        tasks={tasks.done}
                        onAddTasks={() => console.log("Add Task is clicked")}
                    />
                </div>
            </div>
        </div>
    );
}
