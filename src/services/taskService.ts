import axios, { AxiosResponse } from "axios";
import { Task } from "../models/Task";
import { getLocalTasks, createLocalTask} from "./taskMockService";

const API_URL = "http://localhost:8090/api/todo_list";

export async function getTasks(isOnline: boolean) {
    console.log(isOnline);
    if (!isOnline) {
        return getLocalTasks();
    }
    return axios.get(API_URL).then((response) => response.data);
}

export async function createTask(description: string, isDone: boolean = false, isOnline: boolean) {
    if (!isOnline) {
        return createLocalTask(description, isDone);
    }
    const response: AxiosResponse<Task> = await axios.post(`${API_URL}/create`, { description, isDone });
    return response.data;
}

export async function updateTaskStatus(id: number, isDone: boolean, isOnline: boolean) {
    if (!isOnline) {
        return;
    }
    return axios.put(`${API_URL}/update/is_done/${id}`, { isDone });
}

export async function updateTaskDescription(id: number, description: string, isOnline: boolean) {
    if (!isOnline) {
        return;
    }
    return axios.put(`${API_URL}/update/desc/${id}`, { newDescription: description });
}

export async function deleteTask(id: number, isOnline: boolean) {
    if (!isOnline) {
        return;
    }
    return axios.delete(`${API_URL}/delete/${id}`);
}