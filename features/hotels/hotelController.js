import HotelService from "./hotelService.js";
import appResponse from "../../lib/appResponse.js"
import {InternalServerError, NotFoundError} from "../../lib/appError.js"

const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  getHotelRooms,
  countByCity,
  countByType,
createBooking,
getBookingById,
getAllBookings,
updateBooking,
deleteBooking,

} = new HotelService();
export default class HotelController {
   
    async createHotel(req, res, next) {
        try {
            console.log(req.user.id);
            const hotel = await createHotel(req.body);
            res.send(appResponse("Hotel created and associated with destination successfully", hotel));
        } catch (error) {
            console.log(error);
            if (error.message === "No matching destination found for the provided location and state") {
                next(new NotFoundError(error.message));
            } else {
                next(new InternalServerError("Internal server error", error));
            }
        }
    }
    async updateHotel(req, res, next) {
        try {
            const updatedFields = req.body;  
            const hotel = await getHotel(req.params.id);  
    
            if (!hotel) {
                return next(new NotFoundError("Hotel not found"));
            }
    
            // Update only the fields that are provided in the request
            Object.keys(updatedFields).forEach((key) => {
                hotel[key] = updatedFields[key];
            });
    
            await hotel.save();  // Save the updated hotel document
            res.status(200).send(appResponse("Hotel updated successfully", hotel));
        } catch (error) {
            console.log(error);
            next(new InternalServerError("Internal server error"));
        }
    }
    
    
    
    async deleteHotel(req,res,next){
        try{
            await deleteHotel(req.params.id, req.body);
           res.send(appResponse("hotel deleted successfully"))
        }catch(error){
           console.log(error);
           next(new InternalServerError("Internal server error"));
        }
   }
   
   async getHotel(req,res,next){
    try{
        const hotel = await getHotel(req.params.id);
       res.send(appResponse("hotel retrieved successfully",hotel))
       console.log(hotel)
    }catch(error){
       console.log(error);
       next(new InternalServerError("Internal server error"));
    }
}


async getHotels(req, res, next) {
    try {
        const {
            minPrice,
            maxPrice,
            name,
            type,
            brand_new,
            wifi,
            smarthome,
            surveillance,
            panic_button,
            location
        } = req.query;

        const filters = {};

        if (minPrice) filters.price_per_night = { $gte: minPrice };
        if (maxPrice) filters.price_per_night = { ...filters.price_per_night, $lte: maxPrice };
        if (name) filters.name = { $regex: name, $options: "i" };
        if (type) filters.type = type;
        if (brand_new) filters.brand_new = brand_new === 'true';
        if (wifi) filters.wifi = wifi === 'true';
        if (smarthome) filters.smarthome = smarthome === 'true';
        if (surveillance) filters.surveillance = surveillance === 'true';
        if (panic_button) filters.panic_button = panic_button === 'true';
        if (location) filters.location = { $regex: location, $options: "i" };
        console.log('Filter', filters)

        const { hotels, total, totalPages, currentPage } = await getHotels(filters, req.query);

        res.send(
            appResponse("Hotels retrieved successfully", {
                hotels,
                total,
                totalPages,
                currentPage,
            })
        );
    } catch (error) {
        console.log(error);
        next(new InternalServerError("Internal server error", error));
    }
}

async countByCity(req, res, next){
    try{
        const list = await countByCity(req.query.cities);
        res.send(appResponse("list of cities",list));
    }catch(error){
        next(new InternalServerError("Internal server errror",error));
    }
}
   async countByType(req, res,next){
      try{
        const counts = await countByType();
        res.send(appResponse("counts:",counts));
      }catch(error){
        console.log(error)
        next(new InternalServerError("Internal server error",error))
      }
   }
   async getHotelRooms(req, res, next){
    try {
        const rooms = await getHotelRooms(req.params.id);
        res.send(appResponse("the rooms retrieved succesfully",rooms))
    } catch (error) {
        console.log(error)
        next(new InternalServerError("Internal server error",error));
    }
   }


//hotel bookings

async createBooking(req, res, next) {
    console.log(req.user);
    try {

      const  bookData = {
        ...req.body,
        user_id: req.user.id,
        hotel_id: req.params.hotel_id || req.body.hotel_id 
      }
        const booking = await createBooking(bookData);
        res.send(appResponse("Booking created successfully", booking));
    } catch (error) {
        console.error(error);
        next(new InternalServerError("Internal server error", error));
    }
}

async getBooking(req, res, next) {
    try {
        const booking = await getBookingById(req.params.id);
        res.send(appResponse("Booking retrieved successfully", booking));
    } catch (error) {
        if (error.message === 'Booking not found') {
            next(new NotFoundError("Booking Not Found"));
        } else {
            console.error(error);
            next(new InternalServerError("Internal server error", error));
        }
    }
}

async getAllBookings(req, res, next) {
    try {

        const { page, limit } = req.query;
        const result = await getAllBookings({ page, limit });
        res.send(appResponse("All bookings retrieved successfully", result));
    } catch (error) {
        console.error(error);
        next(new InternalServerError("Internal server error", error));
    }
}

async updateBooking(req, res, next) {
    try {
        const updatedBookingData = {
            ...req.body,
            user_id: req.user.id,  
            hotel_id: req.params.hotel_id || req.body.hotel_id 
        };
        const updatedBooking = await updateBooking(req.params.id, updatedBookingData);
        res.send(appResponse("Booking updated successfully", updatedBooking));
    } catch (error) {
        if (error.message === 'Booking not found') {
            next(new NotFoundError("Booking Not Found"))
        } else {
            console.error(error);
            next(new InternalServerError("Internal server error", error));
        }
    }
}

async deleteBooking(req, res, next) {
    try {
        await deleteBooking(req.params.id);
        res.send(appResponse("Booking deleted successfully"));
    } catch (error) {
        if (error.message === 'Booking not found') {
            next(new NotFoundError("Booking Not Found"));
        } else {
            console.error(error);
            next(new InternalServerError("Internal server error", error));
        }
    }
}
    

}
