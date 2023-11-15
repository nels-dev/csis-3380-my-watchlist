/*

This script fetches popular movies and the crew members from TMDB API and load into the application MongoDB
Supplement with command line arguments for the range of pages to fetch.
*/

import dotenv from "dotenv"
import axios from "axios"
import {MongoClient} from "mongodb"


dotenv.config()
const tmdbApiKey = process.env.TMDB_API_KEY;
const mongoUri = process.env.MONGO_URI;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
const startPage = parseInt(process.argv[2]) || 1;
const endPage = parseInt(process.argv[3]) || startPage;


async function fetchPopularMovies(page) {
    console.log(`Fetching popular movie page ${page}`)
    try {
        const response = await axios.get(`${tmdbBaseUrl}/movie/popular?api_key=${tmdbApiKey}&page=${page}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}


async function fetchMovieDetails(movieId) {
    try {
        const response = await axios.get(`${tmdbBaseUrl}/movie/${movieId}?api_key=${tmdbApiKey}&append_to_response=credits`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for movie ID ${movieId}:`, error);
        return null;
    }
}

async function processMovies() {
    try {
        await client.connect();
        const database = client.db('main');
        const crewCollection = database.collection('crew');
        const movieCollection = database.collection('movies');

        for (let page = startPage; page <= endPage; page++) {
            const movies = await fetchPopularMovies(page);

            for (const movie of movies) {
                const movieDetails = await fetchMovieDetails(movie.id);

                if (movieDetails) {
                    const existingMovie = await movieCollection.findOne({ id: movie.id });
                    if (existingMovie) {
                        await movieCollection.updateOne({ id: movie.id }, { $set: movieDetails });
                    } else {
                        await movieCollection.insertOne(movieDetails);
                    }

                    if (movieDetails.credits && movieDetails.credits.crew) {
                        for (const crewMember of movieDetails.credits.crew) {
                            const existingCrew = await crewCollection.findOne({ id: crewMember.id });

                            if (existingCrew) {
                                await crewCollection.updateOne(
                                    { id: crewMember.id },
                                    { $addToSet: { movies: movie.id } }
                                );
                            } else {
                                await crewCollection.insertOne({ ...crewMember, movies: [movie.id] });
                            }
                        }
                    }
                }
                
                // TMDB API has rate limits
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            }
        }
    } finally {
        await client.close();
    }
}

processMovies().catch(console.error);