import mongoose from 'mongoose';
const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    activity: { type: String },
    state: { type: String, required: true },
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    popular :{type: Boolean,default: false},
    image_url: { type: String },
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Destination', DestinationSchema);
