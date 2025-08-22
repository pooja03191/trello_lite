import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default function Column({ column, tasks, onAddTasks }) {
    return (
        <div className="p-4 rounded flex flex-col">
            <h2 className="text-2xl text-black text-center font-bold mb-4">{column.title}</h2>

            <button
                onClick={onAddTasks}
                className="mt-4 mb-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
                Add Task
            </button>

            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-2 flex-1">
                        {tasks.map((task, index) => (
                            <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                                className="cursor-grab bg-white p-2 rounded shadow"
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