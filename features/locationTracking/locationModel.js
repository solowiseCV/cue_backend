import mongoose from 'mongoose';

const LocationTrackingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('LocationTracking', LocationTrackingSchema);
