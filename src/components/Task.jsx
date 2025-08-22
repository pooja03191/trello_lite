import React from 'react';

const Task = React.forwardRef(({ task, dragProps, handleProps }, ref) => {
    return (
        <div
            ref={ref}
            {...dragProps}
            {...handleProps}
            className="bg-white text-black p-2 rounded shadow cursor-grab"
        >
            {task.title}
        </div>
    );
});

export default Task;