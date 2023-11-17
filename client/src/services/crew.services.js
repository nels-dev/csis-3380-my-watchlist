import axios from "axios"
export const crew = (row) => axios.get(`/api/crews/${row}`)