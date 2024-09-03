import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    rental_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Remtal' },
    comment: { type: String },

},{timestamps: true});

export default mongoose.model('Review', ReviewSchema);
