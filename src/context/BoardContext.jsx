import { createContext, useContext, useState } from 'react';

// Create context
const BoardContext = createContext();

// Hook to use context
export function useBoard() {
    return useContext(BoardContext);
}

// Provider
export function BoardProvider({ children }) {
    const [boards, setBoards] = useState({
        "board-1": {
            id: "board-1",
            title: "Project A",
            columns: {
                "col-1": {
                    id: "col-1",
                    title: "To Do",
                    taskIds: ["task-1", "task-2"]
                },
                "col-2": {
                    id: "col-2",
                    title: "In Progress",
                    taskIds: []
                }
            },
            tasks: {
                "task-1": { id: "task-1", title: "Set up project" },
                "task-2": { id: "task-2", title: "Design UI" }
            },
            columnOrder: ["col-1", "col-2"]
        }
    });

    // Add task to column
    const addTask = (boardId, columnId, title) => {
        setBoards(prev => {
            const updated = { ...prev };
            const board = { ...updated[boardId] };

            const newTaskId = `task-${Date.now()}`;
            const newTask = { id: newTaskId, title };

            // immutably update tasks
            const updatedTasks = { ...board.tasks, [newTaskId]: newTask };

            // immutably update column's taskIds
            const updatedColumns = {
                ...board.columns,
                [columnId]: {
                    ...board.columns[columnId],
                    taskIds: [...board.columns[columnId].taskIds, newTaskId]
                }
            };

            // put everything back into board
            updated[boardId] = {
                ...board,
                tasks: updatedTasks,
                columns: updatedColumns
            };

            return updated;
        });
    };


    return (
        <BoardContext.Provider value={{ boards, setBoards, addTask }}>
            {children}
        </BoardContext.Provider>
    );
}
