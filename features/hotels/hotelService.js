import Hotel from "./hotelModel.js";
import Destination from "../destination/destinationModel.js";
import HotelBookingModel from "./hotelBookingModel.js";
export default class HotelService {
  async createHotel(data) {
    const hotel = await Hotel.create(data);
    // Find all matching destinations based on the hotel's location and state
    const matchingDestinations = await Destination.find({
      location: data.location,
      state: data.state,
    });

    if (matchingDestinations.length > 0) {
      // Add the hotel to each matching destination's hotels array
      await Promise.all(
        matchingDestinations.map((destination) =>
          Destination.findByIdAndUpdate(
            destination._id,
            { $push: { hotels: hotel._id } },
            { new: true }
          )
        )
      );
    } else {
      throw new Error(
        "No matching destination found for the provided location and state"
      );
    }

    return hotel;
  }

  async updateHotel(id, data) {
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    const originalLocation = hotel.location;
    const originalState = hotel.state;

    // Update the hotel
    const updatedHotel = await Hotel.findByIdAndUpdate(id, data, { new: true });

    // If location or state changed, update the relevant destinations
    if (data.location !== originalLocation || data.state !== originalState) {
      // Remove hotel from original destinations
      await Destination.updateMany(
        { hotels: id, location: originalLocation, state: originalState },
        { $pull: { hotels: id } }
      );

      // Find new matching destinations
      const newMatchingDestinations = await Destination.find({
        location: updatedHotel.location,
        state: updatedHotel.state,
      });

      // Add the hotel to new matching destinations
      if (newMatchingDestinations.length > 0) {
        await Promise.all(
          newMatchingDestinations.map((destination) =>
            Destination.findByIdAndUpdate(
              destination._id,
              { $push: { hotels: id } },
              { new: true }
            )
          )
        );
      }
    }

    return updatedHotel;
  }

  async deleteHotel(id) {
    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    // Remove the hotel from all destinations that reference it
    await Destination.updateMany({ hotels: id }, { $pull: { hotels: id } });

    return hotel;
  }

  async getHotel(id) {
    return await Hotel.findById(id).exec();
  }

  async getHotels(filters, query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const skip = (page - 1) * limit;

    const hotels = await Hotel.find(filters).skip(skip).limit(limit);

    const total = await Hotel.countDocuments(filters);
    const totalPages = Math.ceil(total / limit);

    return {
      hotels,
      total,
      totalPages,
      currentPage: page,
    };
  }

  async countByCity(cities) {
    const list = await Promise.all(
      cities.split(",").map((city) => {
        return Hotel.countDocuments({ city }).exec();
      })
    );
    return list;
  }

  async countByType() {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" }).exec();
    const apartmentCount = await Hotel.countDocuments({
      type: "apartment",
    }).exec();
    const resortCount = await Hotel.countDocuments({ type: "resort" }).exec();
    const villaCount = await Hotel.countDocuments({ type: "villa" }).exec();

    return [
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
    ];
  }

  async getHotelRooms(hotelId) {
    return await Hotel.findById(hotelId).populate("rooms").exec();
  }

  //hotel booking

  async createBooking(data) {
    const booking = await HotelBookingModel.create(data);
    return booking;
  }

  async getBookingById(id) {
    const booking = await HotelBookingModel.findById(id)
      .populate("hotel_id")
      .exec();
    if (!booking) throw new Error("Booking not found");
    return booking;
  }

  async getAllBookings({ page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      HotelBookingModel.find()
        .skip(skip)
        .limit(limit)
        .populate("hotel_id")
        .exec(),
      HotelBookingModel.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);
    return { bookings, total, totalPages, currentPage: page };
  }

  async updateBooking(id, data) {
    const updatedBooking = await HotelBookingModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (!updatedBooking) throw new Error("Booking not found");
    return updatedBooking;
  }

  async deleteBooking(id) {
    const deletedBooking = await HotelBookingModel.findByIdAndDelete(id).exec();
    if (!deletedBooking) throw new Error("Booking not found");
    return deletedBooking;
  }
}
