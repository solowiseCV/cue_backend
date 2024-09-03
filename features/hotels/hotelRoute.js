import express from "express";
import HotelController from "./hotelController.js";
import authenticate from "../../middlewares/auth.middle.js";
import {
  validateCreateHotel,
  validateUpdateHotel,
} from "../../validator/hotelValidation.js";
import { validateCreateHotelBooking } from "../../validator/hotelBookingValidation.js";

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  createBooking,
  getAllBookings,
  updateBooking,
  getBooking,
  deleteBooking,
} = new HotelController();

const hotelRoute = express.Router();

hotelRoute.get("/countByCity", countByCity);

hotelRoute.post("/", authenticate, validateCreateHotel, createHotel);

hotelRoute.get("/", getHotels);


hotelRoute.patch("/:id", updateHotel);

hotelRoute.delete("/:id", authenticate, deleteHotel);

hotelRoute.get("/:id", getHotel);

hotelRoute.get("/room/:id", countByType);

//hotel bookings
hotelRoute.post("/:hotel_id/",authenticate,()=>{console.log(req.user)});

hotelRoute.get("/:id", getBooking);

hotelRoute.get("/", getAllBookings);

hotelRoute.put("/:id", updateBooking);

hotelRoute.delete("/:id", deleteBooking);

export default hotelRoute;
