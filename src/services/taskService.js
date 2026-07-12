import axios from "axios";

console.log(import.meta.env);
console.log(import.meta.env.VITE_API_URL);
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type" : "application/json",
    },
});
api.interceptors.request.use((config) =>
{
    const token = localStorage.getItem("token");
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Each function
// Sends HTTP request to backend
// Extracts data
// Returns results to components

// Get All Tasks
export const getTasks = async () => {
    const {data} = await api.get("/");
    return data;
}

// Get a Task
export const getTask = async (id) => {
    const { data } = await api.get(`/${id}`);
    return data;
}

// Create a Task
export const createTask = async (task) => {
    const { data } = await api.post("/", task);
    return data;
}

// Update a Task
export const updateTask = async (id, task) => {
    const { data } = await api.put(`/${id}`, task);
    return data;
}

// Delete a task
export const deleteTask = async (id) => {
    await api.delete(`/${id}`);
}