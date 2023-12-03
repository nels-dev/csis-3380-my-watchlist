import axios from "axios"
export const fetchMoviesByGenre = (genre) => axios.get(`/api/movies/genres/${genre}`)
export const fetchMoviesAll = () => axios.get("/api/movies/All")
export const fetchMoviesByCrew = (crew) => axios.get(`/api/movies/crew/${crew}`)
export const fetchSingleMovie = (id) => axios.get(`/api/movies/${id}`)