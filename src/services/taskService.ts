import axios, { AxiosResponse } from "axios";
import { Task } from "../models/Task";
import { isBackendAvailable, getLocalTasks, createLocalTask, updateLocalTaskStatus, updateLocalTaskDescription, deleteLocalTask } from "./taskMockService";

const API_URL = "http://localhost:8090/api/todo_list";

if (process.env.REACT_APP_USE_MOCKS === "true") {
    const AxiosMockAdapter = require("axios-mock-adapter");
    const tasksMock = require("../example-tasks.json");
    const mock = new AxiosMockAdapter(axios);


    mock.onGet(API_URL).reply(200, tasksMock);
}


export async function getTasks() {
    const isAvailable = await isBackendAvailable();
    if (!isAvailable) {
        console.log("Бэкенд недоступен. Используются локальные данные.");
        return getLocalTasks(); // Возвращаем локальные данные
    }
    return axios.get(API_URL).then((response) => response.data);
}

// Создание задачи
export async function createTask(description: string, isDone: boolean = false) {
    const isAvailable = await isBackendAvailable();
    if (!isAvailable) {
        console.log("Бэкенд недоступен. Задача создается локально.");
        return createLocalTask(description, isDone); // Создаем задачу локально
    }
    const response: AxiosResponse<Task>  = await axios.post(`${API_URL}/create`, { description, isDone });
    return response.data;
}

// Обновление статуса задачи
export async function updateTaskStatus(id: number, isDone: boolean) {
    const isAvailable = await isBackendAvailable();
    if (!isAvailable) {
        console.log("Бэкенд недоступен. Статус задачи обновляется локально.");
        return updateLocalTaskStatus(id, isDone); // Обновляем статус локально
    }
    return axios.put(`${API_URL}/update/is_done/${id}`, { isDone });
}

// Обновление описания задачи
export async function updateTaskDescription(id: number, description: string) {
    const isAvailable = await isBackendAvailable();
    if (!isAvailable) {
        console.log("Бэкенд недоступен. Описание задачи обновляется локально.");
        return updateLocalTaskDescription(id, description); // Обновляем описание локально
    }
    return axios.put(`${API_URL}/update/desc/${id}`, { newDescription: description });
}

// Удаление задачи
export async function deleteTask(id: number) {
    const isAvailable = await isBackendAvailable();
    if (!isAvailable) {
        console.log("Бэкенд недоступен. Задача удаляется локально.");
        return deleteLocalTask(id); // Удаляем задачу локально
    }
    return axios.delete(`${API_URL}/delete/${id}`);
}