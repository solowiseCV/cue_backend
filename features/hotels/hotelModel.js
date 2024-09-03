import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    description: { type: String },
    address: { type: String, required: true },
    price_per_night: { type: Number, required: true },
    cheapestPrice: { type: Number, required: true },
    number_of_guest: { type: Number, required: false },
    image_url: [{ type: String }],
    rooms: [
      {
        type: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    beach_view: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    smart_home: { type: Boolean, default: false },
    surveillance: { type: Boolean, default: false },
    panic_button: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", HotelSchema);
