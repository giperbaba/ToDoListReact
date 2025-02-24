import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTaskStatus, updateTaskDescription } from "../services/taskService";
import { Task } from "../models/Task";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import SystemWindowPart from "./SystemWindowPart";
import { useOnline } from "./OnlineProvider";

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const isOnline = useOnline();

    useEffect(() => {
        getTasks(isOnline).then(setTasks);
    }, [isOnline]);

    async function addTask (description: string) {
        const newTask: Task = await createTask(description, false, isOnline);
        setTasks((prev) => [...prev, newTask]);
        console.log(tasks);
    }

    async function displayDeleteTask(id : number) {
        await deleteTask(id, isOnline);
        setTasks((prev) => prev.filter(tasks => tasks.id !== id));
    }

    async function changeTaskStatus(id: number, isDone: boolean) {
        await updateTaskStatus(id, isDone, isOnline);
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, isDone } : task
            )
        );
    }

    async function changeTaskDescription(id: number, description: string) {
        await updateTaskDescription(id, description, isOnline);
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, description } : task
            )
        );
    }

    async function uploadTasksJSON(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const jsonData: Task[] = JSON.parse(e.target?.result as string);
    
                const addedTasks = await Promise.all(jsonData.map(async (task) => {
                    const response = await createTask(task.description, task.isDone, isOnline); 
                    return response;
                }));
    
                setTasks((prev) => [...prev, ...addedTasks]);
            } 
            catch (error) {
                console.error("Ошибка загрузки JSON:", error);
            }
        };
        reader.readAsText(file);
    }

    function downloadTasksJSON() {
        if (tasks.length === 0) return;

        const jsonString = JSON.stringify(tasks, null, 2);
        const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);

        const link = document.createElement("a");
        link.href = dataUri;
        link.download = "tasks.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
        <SystemWindowPart 
                uploadTasksJSON={uploadTasksJSON} 
                downloadTasksJSON={downloadTasksJSON}
            />

        <div className="task-list">
            <TaskForm addTask={addTask} />
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} displayDeleteTask={displayDeleteTask} changeTaskStatus={changeTaskStatus} changeTaskDescription={changeTaskDescription}/>
            ))}
        </div>
        </>
    )
}