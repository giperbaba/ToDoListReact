import { Task } from '../models/Task'
import { updateTaskDescription } from "../services/taskService";
import { useOnline } from './OnlineProvider';

interface TaskItemProps {
    task: Task;
    displayDeleteTask: (id: number) => void;
    changeTaskStatus: (id: number, isDone: boolean) => void;
}

export default function TaskItem({ task, displayDeleteTask, changeTaskStatus }: TaskItemProps) {

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
                onBlur={(e) => updateTaskDescription(task.id, e.currentTarget.textContent || "новое дело", isOnline)}
            >
                {task.description}
            </p>
            <button className="button" id="btn-delete" onClick={() => displayDeleteTask(task.id)}>Удалить</button>
        </div>
    )
}