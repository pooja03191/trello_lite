import { useParams, Link } from 'react-router-dom';
import Column from '../components/Column';
import { DragDropContext } from '@hello-pangea/dnd';
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
        const { source, destination } = result;
        if (!destination) return;

        // same column reorder
        if (source.droppableId === destination.droppableId) {
            setTasks(prev => {
                const updated = Array.from(prev[source.droppableId]);
                const [moved] = updated.splice(source.index, 1);
                updated.splice(destination.index, 0, moved);
                return { ...prev, [source.droppableId]: updated };
            });
            return;
        }

        // move across columns
        setTasks(prev => {
            const sourceList = Array.from(prev[source.droppableId]);
            const destList = Array.from(prev[destination.droppableId]);
            const [moved] = sourceList.splice(source.index, 1);
            destList.splice(destination.index, 0, moved);

            return {
                ...prev,
                [source.droppableId]: sourceList,
                [destination.droppableId]: destList,
            };
        });
    };


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
