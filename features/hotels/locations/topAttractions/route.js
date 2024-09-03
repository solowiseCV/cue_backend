import express from 'express';
import LocationController from './controller.js';
const locationRouter = express.Router();
const {createLocation,updateLocation,deleteLocation,getLocations}= new LocationController();

locationRouter.post("/",createLocation);

locationRouter.put("/:id",updateLocation);

locationRouter.delete("//:id",deleteLocation);

locationRouter.get("/",getLocations);

export default locationRouter;
