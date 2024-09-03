import mongoose from 'mongoose';

const RentalBookingSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rental_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
    pickup_date: { type: Date, required: true },
    return_date: { type: Date, required: true },
    pickup_location: { type: String, required: true },
    dropoff_location: { type: String, required: true },
    cancellation_policy: { type: String, required: true },
    contact_info: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'cancelled', 'confirmed'],
      default: 'pending',
      required: true,
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true }
);


RentalBookingSchema.index({ user_id: 1 });
RentalBookingSchema.index({ rental_id: 1 });
RentalBookingSchema.index({ pickup_date: 1 });
RentalBookingSchema.index({ status: 1 });
RentalBookingSchema.index({ payment_status: 1 });

RentalBookingSchema.index({ user_id: 1, rental_id: 1 });

export default mongoose.model('RentalBooking', RentalBookingSchema);
