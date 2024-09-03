import RentalService from "./rentalService.js";
import appResponse from "../../lib/appResponse.js";
import { InternalServerError, NotFoundError, BadRequestError } from "../../lib/appError.js";

const rentalService = new RentalService();

export default class RentalController {
  async createRental(req, res, next) {
    const userId = req.user.id;
    const data = {
      ...req.body,
      user_id: userId,
    };
    try {
      const rental = await rentalService.createRental(data);
      res.status(201).json(appResponse("Rental created successfully", rental));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async getRental(req, res, next) {
    try {
      const rental = await rentalService.getRentalById(req.params.id);
      if (!rental) {
        return next(new NotFoundError("Rental not found"));
      }
      res.status(200).json(appResponse("Rental retrieved successfully", rental));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async updateRental(req, res, next) {
    try {
      const rental = await rentalService.updateRental(req.params.id, req.body);
      if (!rental) {
        return next(new NotFoundError("Rental not found"));
      }
      res.status(200).json(appResponse("Rental updated successfully", rental));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async deleteRental(req, res, next) {
    try {
      await rentalService.deleteRental(req.params.id);
      res.status(200).json(appResponse("Rental deleted successfully"));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async getAllRentals(req, res, next) {
    try {
      const rentals = await rentalService.getAllRentals(req.query);
      res.status(200).json(appResponse("All rentals retrieved successfully", rentals));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  // Updated createRentalBooking to handle concurrent bookings
  async createRentalBooking(req, res, next) {
    const session = await rentalService.startSession();
    session.startTransaction();

    try {
      const bookingData = {
        ...req.body,
        user_id: req.user.id,
      };

      // Fetch rental within a session to apply a lock
      const rental = await rentalService.getRentalById(req.body.rental_id, { session });

      if (!rental) {
        throw new NotFoundError("Rental not found");
      }

      if (!rental.available) {
        throw new BadRequestError("Rental is no longer available");
      }

      // Proceed with booking
      const newBooking = await rentalService.createRentalBooking(bookingData, session);

      // Mark rental as unavailable
      rental.available = false;
      await rental.save({ session });

      await session.commitTransaction();
      res.status(201).json(appResponse("Rental booking created successfully", newBooking));
    } catch (error) {
      await session.abortTransaction();
      next(new InternalServerError("Failed to create rental booking", error));
    } finally {
      session.endSession();
    }
  }

  async getRentalBookingById(req, res, next) {
    try {
      const booking = await rentalService.getRentalBookingById(req.params.id);
      if (!booking) {
        return next(new NotFoundError("Booking not found"));
      }
      res.status(200).json(appResponse("Fetched successfully", booking));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async updateRentalBooking(req, res, next) {
    try {
      const updatedBooking = await rentalService.updateRentalBooking(req.params.id, req.body);
      if (!updatedBooking) {
        return next(new NotFoundError("Booking not found"));
      }
      res.status(200).json(appResponse("Updated successfully", updatedBooking));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async deleteRentalBooking(req, res, next) {
    try {
      await rentalService.deleteRentalBooking(req.params.id);
      res.status(200).json(appResponse("Deleted successfully"));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async getAllRentalBookings(req, res, next) {
    try {
      const bookings = await rentalService.getAllRentalBookings();
      res.status(200).json(appResponse("Fetched all successfully", bookings));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }
}
