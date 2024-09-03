import express from "express";
import RentalController from "./rentalController.js";
import authenticate from "../../middlewares/auth.middle.js";
import {
  validateCreateRental,
  validateUpdateRental,
} from "../../validator/rentalValidation.js";

const rentalRouter = express.Router();
const {
  createRental,
  getAllRentals,
  updateRental,
  getRental,
  getAllRentalBookings,
  createRentalBooking,
  getRentalBookingById,
  updateRentalBooking,
  deleteRentalBooking,
  deleteRental,
} = new RentalController();

rentalRouter.post("/", authenticate, validateCreateRental, createRental);

rentalRouter.get("/", getAllRentals);

rentalRouter.get("/:id", getRental);

rentalRouter.put("/:id", validateUpdateRental, updateRental);

rentalRouter.delete("/:id", deleteRental);

//rental bookings
rentalRouter.post("/bookings", authenticate, createRentalBooking);

rentalRouter.get("/bookings/:id", getRentalBookingById);

rentalRouter.put("/bookings/:id", authenticate, updateRentalBooking);

rentalRouter.delete("/bookings/:id", authenticate, deleteRentalBooking);

rentalRouter.get("/bookings", getAllRentalBookings);

export default rentalRouter;
