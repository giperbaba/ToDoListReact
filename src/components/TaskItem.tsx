import { Task } from '../models/Task'
import { useOnline } from './OnlineProvider';

interface TaskItemProps {
    task: Task;
    displayDeleteTask: (id: number) => void;
    changeTaskStatus: (id: number, isDone: boolean) => void;
    changeTaskDescription: (id: number, description: string) => void;
}

export default function TaskItem({ task, displayDeleteTask, changeTaskStatus, changeTaskDescription }: TaskItemProps) {

    const isOnline = useOnline();

    return (
        <div className="task-item">
            <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => changeTaskStatus(task.id, !task.isDone)}
            />
            <p
                contentEditable
                suppressContentEditableWarning
                className="task-description"
                onBlur={(e) => changeTaskDescription(task.id, e.currentTarget.textContent || "новое дело")}
            >
                {task.description}
            </p>
            <button className="button" id="btn-delete" onClick={() => displayDeleteTask(task.id)}>Удалить</button>
        </div>
    )
}