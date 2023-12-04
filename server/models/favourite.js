import mongoose from "mongoose"
const FavouriteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    targetId:{
        type: Number,
        required: true
    }
}, {collection: 'favourites'})

export default mongoose.model('favourite', FavouriteSchema)