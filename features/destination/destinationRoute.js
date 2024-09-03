import express from 'express';
import DestinationController from './destinationController.js';
import { validateCreateDestination, validateUpdateDestination } from '../../validator/destinationValidation.js';
import authenticate from '../../middlewares/auth.middle.js';

const {
    createDestination,
    getAllDestinations,
    updateDestination,
    deleteDestination,
    getDestination,
    getHotelsByDestination,
    getDestinationsAndCreateTrip,
    getPopularDestinations,
    searchDestinations
} = new DestinationController();

const destinationRouter = express.Router();

destinationRouter.get('/popular', getPopularDestinations);

destinationRouter.get('/create', authenticate,getDestinationsAndCreateTrip);

destinationRouter.get('/place', authenticate, searchDestinations);

destinationRouter.post('/', authenticate, validateCreateDestination, createDestination);

destinationRouter.get('/:id', getDestination);

destinationRouter.put('/:id', authenticate, validateUpdateDestination, updateDestination);

destinationRouter.delete('/:id', authenticate, deleteDestination);
destinationRouter.get('/', getAllDestinations);

destinationRouter.get('/:id/hotels', authenticate, getHotelsByDestination);

export default destinationRouter;
