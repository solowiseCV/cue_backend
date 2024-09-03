import mongoose from "mongoose";

const hotelBookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    check_in: { type: Date, required: false },
    check_out: { type: Date, required: false },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    total_amount: { type: Number, required: true },
    room_type: { type: String },
    number_of_guests: { type: Number },
    booking_date: { type: Date, default: Date.now },
    payment_method: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "bank_transfer"],

    }, 
    
    cancellation_policy: { type: String },
    contact_info: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("HotelBooking", hotelBookingSchema);
