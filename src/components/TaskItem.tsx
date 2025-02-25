import { useState } from 'react';
import { Task } from '../models/Task'

interface TaskItemProps {
    task: Task;
    displayDeleteTask: (id: number) => void;
    changeTaskDescription: (id: number, description: string) => void;
    changeTaskStatus: (id: number, isDone: boolean) => void;
}

export default function TaskItem({ task, displayDeleteTask, changeTaskDescription, changeTaskStatus}: TaskItemProps) {
    
    const [isDone, setIsDone] = useState(task.isDone);
    const [description, setDescription] = useState(task.description);

    function handleCheckboxChange() {
        const newStatus = !isDone;
        setIsDone(newStatus);
        changeTaskStatus(task.id, newStatus);
    }

    function handleDescriptionEdit(e: React.FocusEvent<HTMLParagraphElement>) {
        const newDescription = e.currentTarget.textContent || "новое дело";
        setDescription(newDescription);
        changeTaskDescription(task.id, newDescription);
    }

    return (
        <div className="task-item">
            <input
                type="checkbox"
                checked={isDone}
                onChange={handleCheckboxChange}
            />
            <p
                contentEditable
                suppressContentEditableWarning
                className="task-description"
                onBlur={handleDescriptionEdit}
            >
                {task.description}
            </p>
            <button className="button" id="btn-delete" onClick={() => displayDeleteTask(task.id)}>Удалить</button>
        </div>
    )
}

