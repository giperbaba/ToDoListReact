import axios, { AxiosResponse } from "axios";
import { Task } from "../models/Task";
import { isBackendAvailable, getLocalTasks, createLocalTask, updateLocalTaskStatus, updateLocalTaskDescription, deleteLocalTask } from "./taskMockService";
import { useOnline } from "../components/OnlineProvider";

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
        return updateLocalTaskStatus(id, isDone);
    }
    return axios.put(`${API_URL}/update/is_done/${id}`, { isDone });
}

export async function updateTaskDescription(id: number, description: string, isOnline: boolean) {
    if (!isOnline) {
        return updateLocalTaskDescription(id, description);
    }
    return axios.put(`${API_URL}/update/desc/${id}`, { newDescription: description });
}

export async function deleteTask(id: number, isOnline: boolean) {
    if (!isOnline) {
        return deleteLocalTask(id);
    }
    return axios.delete(`${API_URL}/delete/${id}`);
}