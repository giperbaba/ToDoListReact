import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTaskStatus, updateTaskDescription } from "../services/taskService";
import { Task } from "../models/Task";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import SystemWindowPart from "./SystemWindowPart";
import { useOnline } from "./OnlineProvider";

export default function TaskList() {
    const [tasks, setTasks] = useState<Map<number, Task>>(new Map());

    const isOnline = useOnline();

    useEffect(() => {
        getTasks(isOnline).then((taskArray: Task[]) => { 
            setTasks(new Map(taskArray.map((task: Task) => [task.id, task]))); 
        });
    }, [isOnline]);

    async function addTask(description: string) {
        const newTask: Task = await createTask(description, false, isOnline);
        setTasks((prev) => new Map(prev).set(newTask.id, newTask));
    }

    async function displayDeleteTask(id: number) {
        await deleteTask(id, isOnline);
        setTasks((prev) => {
            const newTasks = new Map(prev);
            newTasks.delete(id);
            return newTasks;
        });
    }

    async function changeTaskStatus(id: number, isDone: boolean) {
        await updateTaskStatus(id, isDone, isOnline);
        setTasks((prev) => {
            const newTasks = new Map(prev);
            const task = newTasks.get(id);
            if (task) newTasks.set(id, { ...task, isDone });
            return newTasks;
        });
    }

    async function changeTaskDescription(id: number, description: string) {
        await updateTaskDescription(id, description, isOnline);
        setTasks((prev) => {
            const newTasks = new Map(prev);
            const task = newTasks.get(id);
            if (task) newTasks.set(id, { ...task, description });
            return newTasks;
        });
    }

    async function uploadTasksJSON(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const jsonData: Task[] = JSON.parse(e.target?.result as string);
    
                const addedTasks = await Promise.all(jsonData.map(async (task) => {
                    return await createTask(task.description, task.isDone, isOnline);
                }));
    
                const newTasksMap = new Map(tasks);
                addedTasks.forEach(task => newTasksMap.set(task.id, task));
                setTasks(newTasksMap);
            } catch (error) {
                console.error("Ошибка загрузки JSON:", error);
            }
        };
        reader.readAsText(file);
    }

    function downloadTasksJSON() {
        if (tasks.size === 0) return;

        const jsonString = JSON.stringify(Array.from(tasks.values()), null, 2);
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
                {Array.from(tasks.values()).map((task) => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        displayDeleteTask={displayDeleteTask} 
                        changeTaskDescription={changeTaskDescription}
                        changeTaskStatus={changeTaskStatus}
                    />
                ))}
            </div>
        </>
    );
}