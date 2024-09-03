import LocationService from "./service.js";
import appResponse from "../../../../lib/appResponse.js";
import { InternalServerError, NotFoundError } from "../../../../lib/appError.js";

const { createLocation, updateLocation, getLocations, deleteLocation,getLocationsByState } =
  new LocationService();

export default class LocationController {
  async createLocation(req, res, next) {
    try {
      const newLocation = await createLocation(req.body);
      res.send(appResponse("Location  created  successfully", newLocation));
    } catch (error) {
      console.log(error);

      next(new InternalServerError("Internal server error", error));
    }
  }

  async updateLocation(req, res, next) {
    try {
      const updatedLocation = await updateLocation(req.params.id, req.body);

      if (!updatedLocation) {
        return next(new NotFoundError("Location not found"));
      }

      res
        .status(200)
        .send(appResponse("Location updated successfully", updatedLocation));
    } catch (error) {
      console.log(error);
      next(new InternalServerError("Internal server error"));
    }
  }

  async deleteLocation(res, req, next) {
    try {
      await deleteLocation(req.params.id.req.body);
      res.status(200).send(appResponse("Deleted..."));
    } catch (error) {
      console.log(error);
      next(new InternalServerError("Internal Server error"));
    }
  }

  async getLocation(req,res,next){
    try{
        const location = await getLocation(req.params.id);
       res.send(appResponse("Location retrieved successfully",location))
       console.log(location)
    }catch(error){
       console.log(error);
       next(new InternalServerError("Internal server error"));
    }
}

async getLocations(req,res,next){
  try{
      const locations = await getLocations(req.query);
     res.send(appResponse("locations retrieved successfully",locations))
     console.log(locations)
  }catch(error){
     console.log(error);
     next(new InternalServerError("Internal server error"));
  }
}

async getLocationsByState(req, res, next) {
  try {
      const state = req.query.state;
      if (!state) {
          return next(new BadRequestError("State is required"));
      }
      
      
      console.log(`Filtering locations by state: ${state}`);
      
      const locations = await getLocationsByState(state);
      res.send(appResponse("Locations retrieved successfully by state", locations));
  } catch (error) {
      console.log(error);
      next(new InternalServerError("Internal server error"));
  }
}

}
