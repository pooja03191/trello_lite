import { useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import { useBoard } from "../context/BoardContext";
import Column from "./Column";

export default function Board() {
    const { boardId } = useParams();
    const { boards, setBoards, addTask } = useBoard();

    const board = boards[boardId];

    if (!board) return <div className="p-6">Board not found</div>;

    // Handle drag and drop between columns
    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        // dropped outside any column
        if (!destination) return;

        setBoards(prev => {
            const updated = { ...prev };
            const board = { ...updated["board-1"] }; // 👈 or dynamic boardId

            const sourceCol = board.columns[source.droppableId];
            const destCol = board.columns[destination.droppableId];

            // immutably copy taskIds
            const sourceTaskIds = [...sourceCol.taskIds];
            const destTaskIds = [...destCol.taskIds];

            // remove from source
            sourceTaskIds.splice(source.index, 1);

            // insert into destination
            destTaskIds.splice(destination.index, 0, draggableId);

            // build new columns
            const updatedColumns = {
                ...board.columns,
                [sourceCol.id]: { ...sourceCol, taskIds: sourceTaskIds },
                [destCol.id]: { ...destCol, taskIds: destTaskIds }
            };

            updated["board-1"] = { ...board, columns: updatedColumns };

            return updated;
        });
    };



    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{board.title}</h1>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-6 overflow-x-auto p-6 bg-gray-50 min-h-screen">
                    {board.columnOrder.map(colId => {
                        const column = board.columns[colId];
                        const tasks = column.taskIds.map(tid => board.tasks[tid]);
                        return (
                            <Column
                                key={column.id}
                                column={column}
                                tasks={tasks}
                                onAddTasks={() => {
                                    const title = prompt("Enter task title:");
                                    if (title) addTask(boardId, column.id, title);
                                }}
                            />
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}
