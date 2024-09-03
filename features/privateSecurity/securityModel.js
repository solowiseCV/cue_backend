import mongoose from 'mongoose';

const PrivateSecuritySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    security_provider: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('PrivateSecurity', PrivateSecuritySchema);
