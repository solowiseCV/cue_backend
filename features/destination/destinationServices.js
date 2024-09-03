
import Destination from '../destination/destinationModel.js';
export default class DestinationService {
    async createDestination(data) {
        return await Destination.create(data);
    }

    async getDestinationById(id) {
        return await Destination.findById(id).exec();
    }

    async updateDestination(id, data) {
        return await Destination.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteDestination(id) {
        return await Destination.findByIdAndDelete(id).exec();
    }

    async  getAllDestinations(page = 1, limit = 10, filter = {}) {
        const skip = (page - 1) * limit;
    
        const [destinations, total] = await Promise.all([
            Destination.find(filter).skip(skip).limit(limit).exec(),
            Destination.countDocuments(filter)
        ]);
    
        const totalPages = Math.ceil(total / limit);
    
        return {
            destinations,
            total,
            totalPages,
            currentPage: page
        };
    }
    

      
    async getDestinationsByState(state) {
        try {
            const destinations = await Destination.find({ state: state });
            return destinations;
        } catch (error) {
            throw new Error("Error fetching destinations by state: " + error.message);
        }
    }

  

    async getHotelsByDestinationId(destinationId) {

        return await Destination.findById(destinationId).populate('hotels').exec();
    }

    async searchDestinations({ name, activity, hotel,location }) {
        const query = {};

        if (name) {
            query.name = new RegExp(name, 'i'); // Case-insensitive regex search
        }

        if (location) {
        query.location = new RegExp(location, 'i'); // Case-insensitive regex search for location
        }

        if (activity) {
            query.activities = activity; // Match the activity
        }

        if (hotel) {
            query.hotels = hotel; // Match the hotel by ID
        }

        return await Destination.find(query).populate('hotels').exec();
    }
}

