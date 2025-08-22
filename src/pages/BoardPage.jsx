import { useParams, Link } from 'react-router-dom';
import Column from '../components/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';

const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
];

export default function BoardPage() {
    const { id } = useParams();
    const [tasks, setTasks] = useState({
        todo: [
            { id: 'task-1', title: 'Task A' },
            { id: 'task-2', title: 'Task B' },
        ],
        inProgress: [
            { id: 'task-3', title: 'Task C' },
        ],
        done: [],
    });

    const handleAddTask = (columnId) => {
        setTasks((prev) => {
            const newTask = {
                id: `task-${prev[columnId].length + 1}`, // Simple unique ID using timestamp
                title: `New Task ${prev[columnId].length + 1}`,
            };

            return {
                ...prev,
                [columnId]: [...prev[columnId], newTask],
            };
        });
    };

    const handleDragEnd = (result) => {
        console.log('Drag Result:', result);
        const { source, destination } = result;

        if (!destination) return; // Dropped outside any column

        const sourceTasks = Array.from(tasks[source.droppableId]);
        const destTasks = Array.from(tasks[destination.droppableId]);

        const [movedTask] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, movedTask);

        setTasks((prev) => ({
            ...prev,
            [source.droppableId]: sourceTasks,
            [destination.droppableId]: destTasks,
        }));
    }


    return (
        <div className="p-4">
            <Link to="/" className="text-blue-500 underline">← Back to Boards</Link>
            <h1 className="text-2xl text-black text-center font-bold mt-4">Board {id}</h1>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="mt-6 flex flex-col md:flex-row gap-4">
                    {columns.map((col, index) => (
                        <div className="flex-1 bg-gray-200 p-4 rounded shadow" key={index}>
                            <Column
                                key={`Column_${index}`}
                                column={col}
                                tasks={tasks[col.id]}
                                onAddTasks={() => handleAddTask(col.id)}
                            />
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
