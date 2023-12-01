import mongoose from "mongoose"

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const movieSchema = new Schema({}, {collection: 'movies'});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;