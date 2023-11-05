import axios from "axios"
export const login = (form) => axios.post("/api/users/login", {...form})