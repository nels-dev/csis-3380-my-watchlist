import axios from "axios"
export const crew = (id) => axios.get(`/api/crews/${id}`)
export const crewAll = () => axios.get(`/api/crews`)