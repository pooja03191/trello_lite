import Task from './Task';

export default function Column({ title, tasks, onAddTasks }) {
    return (
        <div className="p-4 rounded flex flex-col">
            <h2 className="text-2xl text-black text-center font-bold mb-4">{title}</h2>

            <button
                onClick={onAddTasks}
                className="mt-4 mb-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
                Add Task
            </button>

            <div className="space-y-2 flex-1">
                {tasks.map((task, index) => (
                    <Task key={index} title={task.title} />
                ))}
            </div>
        </div>
    );
}