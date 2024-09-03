import { InternalServerError, NotFoundError } from '../../lib/appError.js';
import appResponse from "../../lib/appResponse.js"
import DestinationService from './destinationServices.js';
const {
    createDestination,
    getAllDestinations,
    getDestinationById,
    updateDestination,
    getHotelsByDestinationId,
    deleteDestination,
    getDestinationsByState,
    createTrip,
    searchDestinations
} = new DestinationService();

export default class DestinationController {

    async createDestination(req,res,next){
        try{
            const savedDestination = await createDestination(req.body);
            res.send(appResponse("Destination created successfully", savedDestination));
            console.log(savedDestination)
        }catch(error){
            console.log(error);
            next(new InternalServerError("Internal server error",error));
        }
    }

    

    async getDestination(req, res, next) {
        try {
            const destination = await getDestinationById(req.params.id);
            if (destination) {
                res.send(appResponse("Destination retrieved successfully", destination));
            } else {
                next(new NotFoundError("Destination Not Found"));
            }
        } catch (error) {
            next(new InternalServerError("Internal Server error", error));
        }
    }


    async updateDestination(req, res, next) {
        try {
            const destination = await updateDestination(req.params.id, req.body);
            res.send(appResponse("Destination updated successfully", destination));
        } catch (error) {
            next(new InternalServerError("Internal Server error", error));
        }
    }

    async deleteDestination(req, res, next) {
        try {
            await deleteDestination(req.params.id);
            res.send(appResponse("Destination deleted successfully"));
        } catch (error) {
            next(new InternalServerError("Internal server error", error));
        }
    }

    async getAllDestinations(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const result = await getAllDestinations(page, limit);
            res.send(appResponse("All destinations retrieved successfully", result));
        } catch (error) {
            next(new InternalServerError("Internal server error", error));
        }
    }

    async getPopularDestinations(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
    
            // Fetch only popular destinations
            const result = await getAllDestinations(page, limit, { popular: true });
            res.send(appResponse("Popular destinations retrieved successfully", result));
        } catch (error) {
            next(new InternalServerError("Internal server error", error));
        }
    }
    

    
    async getDestinationsAndCreateTrip(req, res, next) {
        try {
            const { state, startDate, endDate, page = 1, limit = 10 } = req.query;
            const userId = req.user.id;  
             console.log(userId)
            // Convert page and limit to numbers
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
            const skip = (pageNumber - 1) * limitNumber;
    
            // Filter destinations based on the state provided and paginate the results
            const allDestinations = await getDestinationsByState(state);
            if (allDestinations.length === 0) {
                return next(new NotFoundError("No destinations found for the provided state"));
            }
    
            const destinations = allDestinations.slice(skip, skip + limitNumber);
            
            // If both startDate and endDate are provided, create trips
            let trips = [];
            if (startDate && endDate) {
                trips = await Promise.all(destinations.map(async (destination) => {
                    const tripData = {
                        destination_id: destination._id,
                        user_id: userId,
                        start_date: new Date(startDate),
                        end_date: new Date(endDate)
                    };
    
                    return await createTrip(tripData);
                }));
            }
    
            // Response data
            const responseData = {
                totalDestinations: allDestinations.length,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(allDestinations.length / limitNumber),
                destinations,
                trips
            };
    
            // Return the paginated destinations and trips (if any were created)
            res.send(appResponse("Destinations retrieved successfully", responseData));
        } catch (error) {
            console.log(error);
            next(new InternalServerError("Internal server error", error));
        }
    }
    



    async getHotelsByDestination(req, res, next) {
        try {
            const hotels = await getHotelsByDestinationId(req.params.id);
            res.send(appResponse("All Hotels relating to this destination retrieved successfully", hotels));
        } catch (error) {
            next(new InternalServerError("Internal server error", error));
        }
    }


    
   async searchDestinations(req, res, next) {
    try {
        const { name, activity, hotel,location } = req.query;

        const results = await searchDestinations({ name, activity, hotel ,location});

        if (results.length > 0) {
            res.send(appResponse('Search results retrieved successfully', results));
        } else {
            next(new NotFoundError('No destinations matched your search criteria'));
        }
    } catch (error) {
        console.log(error);
        next(new InternalServerError('Internal server error', error));
    }
}
}
