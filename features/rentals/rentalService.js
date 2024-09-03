import Rental from './rentalModel.js'; 
import RentalBooking from './bookRentalmodel.js'; 

export default class RentalService {
    async createRental(data) {
        return await Rental.create(data);
    }

    async getRentalById(id) {
        return await Rental.findById(id);
    }

    async updateRental(id, data) {
        return await Rental.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteRental(id) {
        return await Rental.findByIdAndDelete(id);
    }

    async updateAvailability(id, isAvailable) {
        return await Rental.findByIdAndUpdate(id, { available: isAvailable }, { new: true });
    }
    
    async getAllRentals(filters) {
        const {
            air_conditioner,
            price,
            leaving_from,
            pickup_time,
            pickup_date,
            number_of_seats,
            brand,
        } = filters;

        const query = {};

        if (air_conditioner !== undefined) {
            query.air_conditioner = air_conditioner === 'true'; 
        }

        if (price) {
            query.rental_amount = { $lte: Number(price) }; 
        }

        if (leaving_from) {
            query.leaving_from = { $regex: new RegExp(leaving_from, 'i') }; 
        }

        if (pickup_time) {
            query.rental_time = pickup_time; 
        }

        if (pickup_date) {
            query.rental_date = { $gte: new Date(pickup_date) }; 
        }

        if (number_of_seats) {
            query.number_of_seats = Number(number_of_seats); 
        }

        if (brand) {
            query.brand = { $regex: new RegExp(brand, 'i') };
        }

        return await Rental.find(query);
    }

    //bookings
    async createRentalBooking(bookingData) {
        
    console.log(bookingData)
        const { rental_id, pickup_date, return_date, pickup_location, dropoff_location, cancellation_policy, contact_info } = bookingData;
  
    const rental = await Rental.findById(rental_id);
    if (!rental) {
        throw new Error('Rental not found');
    }

    if (!rental.available) {
        throw new Error('Rental is not available');
    }

    const newBooking = new RentalBooking({
        rental_id,
        pickup_date,
        return_date,
        pickup_location,
        dropoff_location,
        cancellation_policy,
        contact_info,
        status: "confirmed"
    });

    await newBooking.save();

    rental.available = false;
    await rental.save();

    return newBooking;
}

async getRentalBookingById(bookingId) {
    const booking = await RentalBooking.findById(bookingId).populate('rental_id');
    if (!booking) {
        throw new Error('Rental booking not found');
    }
    return booking;
}

async updateRentalBooking(bookingId, updateData) {
    const booking = await RentalBooking.findById(bookingId);
    if (!booking) {
        throw new Error('Rental booking not found');
    }

    if (updateData.pickup_date || updateData.return_date) {
        const rental = await RentalBooking.findById(booking.rental_id);
        if (!rental.available) {
            throw new Error('Rental is not available for the new dates');
        }
    }

    Object.assign(booking, updateData);

    await booking.save();
    return booking;
}

async deleteRentalBooking(bookingId) {
    const booking = await RentalBooking.findById(bookingId);
    if (!booking) {
        throw new Error('Rental booking not found');
    }

    const rental = await Rental.findById(booking.rental_id);

    await RentalBooking.deleteOne({ _id: bookingId });

    // Ensure rental availability is updated only if the booking was confirmed
    if (rental && booking.status === 'confirmed') {
        rental.available = true;
        await rental.save();
    }

    return booking;
}


async getAllRentalBookings() {
    return await RentalBooking.find().populate('rental_id');
}

}
