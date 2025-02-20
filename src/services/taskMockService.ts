import axios from "axios";
import { Task } from "../models/Task";

const tasksMock = require("../example-tasks.json");


const API_URL = "http://localhost:8090/api/todo_list";

export async function isBackendAvailable() {
    try {
        await axios.get(API_URL); 
        return true;
    } 
    catch (error) {
        return false; 
    }
}

let localTasks = [...tasksMock]; 

export function getLocalTasks() {
    return localTasks;
}

export function createLocalTask(description: string, isDone: boolean = false) {
    const newTask = new Task( localTasks.length + 2, isDone, description);
    localTasks.push(newTask); 
    return newTask;
}

export function updateLocalTaskStatus(id: number, isDone: boolean) {
    const task = localTasks.find((task) => task.id === id);
    if (task) {
        task.isDone = isDone;
    }
    return task;
}

export function updateLocalTaskDescription(id: number, description: string) {
    const task = localTasks.find((task) => task.id === id);
    if (task) {
        task.description = description;
    }
    return task;
}

export function deleteLocalTask(id: number) {
    localTasks = localTasks.filter((task) => task.id !== id);
    return localTasks;
}