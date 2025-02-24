import axios from "axios";
import { Task } from "../models/Task";
import uuid from "react-uuid";

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
    const id = parseInt(uuid().replace(/-/g, '').slice(0, 9), 16);
    const newTask = new Task(id , description, isDone);
    return newTask;
}