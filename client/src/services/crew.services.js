import axios from "axios"
export const fetchDeptCrew = (name) => axios.get(`/api/crews/dept/${name}`)