import mongoose from 'mongoose';

let mediaSchema = new mongoose.Schema({
    uid: String, //user_id
    cid: String, //cloud_id
    aid: String, //album_id
    src: String,
    type: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'medias'
});

export default mongoose.model('medias', mediaSchema);