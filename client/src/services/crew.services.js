import axios from "axios"
export const fetchDeptCrew = (name) => axios.get(`/api/crews/dept/${name}`)
export const fetchCrewsByMovie = (name) => axios.get(`/api/crews/movie/${name}`)