import mongoose from 'mongoose';

const TravelScheduleSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    event_name: { type: String, required: true },
    event_description: { type: String },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('TravelSchedule', TravelScheduleSchema);
