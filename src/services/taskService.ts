import axios from "axios";

const API_URL = "http://localhost:8090/api/todo_list";

export async function getTasks() {
    return axios.get(API_URL).then((response) => response.data);
}

export async function createTask(description: string, isDone : boolean = false) {
    return axios.post(`${API_URL}/create`, { description, isDone });
}

export async function updateTaskStatus(id: number, isDone: boolean) {
    return axios.put(`${API_URL}/update/is_done/${id}`, { isDone });
}

export async function updateTaskDescription(id: number, description: string) {
    return axios.put(`${API_URL}/update/desc/${id}`, { newDescription: description });
}

export async function deleteTask(id: number) {
    return axios.delete(`${API_URL}/delete/${id}`);
}