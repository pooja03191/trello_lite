import Task from './Task';
import { Droppable, Draggable } from '@hello-pangea/dnd';

export default function Column({ column, tasks, onAddTasks }) {
    return (
        <div className="bg-gray-100 p-4 rounded-2xl shadow-md flex flex-col w-72 min-h-[300px]">
            <h2 className="text-2xl text-black text-center font-bold mb-4">{column.title}</h2>

            <button
                onClick={onAddTasks}
                className="mb-3 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
            >
                Add Task
            </button>

            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-2 flex-1"
                    >
                        {tasks.map((task, index) => (
                            <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                            >
                                {(provided) => (
                                    <Task
                                        ref={provided.innerRef}
                                        task={task}
                                        dragProps={provided.draggableProps}
                                        handleProps={provided.dragHandleProps}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}