import mongoose from 'mongoose';

const RentalSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    leaving_from: { type: String, required: true },
    image_url: { type: String, required: true },
    driver_number: { type: String, required: true },
    rental_plate_number: { type: String, required: true },
    rental_date: { type: Date, required: true },
    return_date: { type: Date, required: true },
    available: { type: Boolean, required: true },
    rental_time: { type: String, required: true }, 
    rental_amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'cancelled', 'confirmed'], default: 'pending', required: true },
    number_of_seats: { type: Number, required: true },
    air_conditioned: { type: Boolean, default: false },
    available: { type: Boolean, required: true, default: true },
    brand: { 
        type: String, 
        enum: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Other'], 
        required: true 
    },
    condition: { 
        type: String, 
        enum: ['Brand New', 'Nigerian Drive', 'Foreign Used'], 
        required: true 
    }, 
}, { timestamps: true });

export default mongoose.model('Rental', RentalSchema);

