import mongoose from "mongoose"
const CrewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {collection: 'crew'})
export default mongoose.model('crew', CrewSchema)