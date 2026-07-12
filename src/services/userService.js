import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_USER_URL,
    headers: {
        "Content-Type" : "application/json",
    },
});

export const register = async (user) => {
    const { data } = await api.post("/register", user);
    return data;
}

export const login = async (user) => {
    const { data } = await api.post("/login", user);
    localStorage.setItem("token", data.token);
    return data;
}
