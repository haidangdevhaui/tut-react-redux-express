import mongoose from 'mongoose';

let statusSchema = new mongoose.Schema({
    content: String,
    uid: String,
    media: {
        images: [],
        video: []
    },
    like: [],
    dislike: [],
    share: [],
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'statuses'
});

export default mongoose.model('statuses', statusSchema);