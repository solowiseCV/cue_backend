import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    room_number: { type: String, required: true },
    type: { type: String, required: true },  // e.g., 'single', 'double', 'suite'
    price: { type: Number, required: true },
    amenities: { type: [String] },  // e.g., ['wifi', 'tv', 'minibar']
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Room', RoomSchema);
