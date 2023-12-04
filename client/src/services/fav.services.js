import axios from "axios"

export const addCrewFav = (crewId, token) => axios.post('/api/my/fav-crew', {id: crewId}, {
    headers: {'Authorization': `Bearer ${token}`}
})

export const addMovieFav = (movieId, token) => axios.post('/api/my/fav-movie', {id: movieId}, {
    headers: {'Authorization': `Bearer ${token}`}
})

export const checkCrewFavStatus = (crewId, token) => axios.get(`/api/my/fav-crew/${crewId}`, {
    headers: {'Authorization': `Bearer ${token}`}
})
export const checkMovieFavStatus = (movieId, token) => axios.get(`/api/my/fav-movie/${movieId}`, {
    headers: {'Authorization': `Bearer ${token}`}
})

export const deleteCrewFav = (crewId, token) => axios.delete(`/api/my/fav-crew/${crewId}`, {
    headers: {'Authorization': `Bearer ${token}`}
})
export const deleteMovieFav = (movieId, token) => axios.delete(`/api/my/fav-movie/${movieId}`, {
    headers: {'Authorization': `Bearer ${token}`}
})

export const getCrewFav = (token) => axios.get('/api/my/fav-crew', {
    headers: {'Authorization': `Bearer ${token}`}
})

export const getMovieFav = (token) => axios.get('/api/my/fav-movie', {
    headers: {'Authorization': `Bearer ${token}`}
})
