import axios from "axios"
export const fetchMoviesByGenre = (genre) => axios.get(`/api/movies/${genre}`)
export const fetchMoviesAll = () => axios.get("/api/movies/All")