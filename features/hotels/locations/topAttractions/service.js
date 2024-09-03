import locationModel from "../locationModel.js";

export default class LocationService{

    async createLocation(data){
        const location = await locationModel.create(data);
        return location
    }

    async getLocations(){
        const locations = await locationModel.find({});
        return locations;
    }

    async updateLocation(id,data){
        const location = await locationModel.findById(id);
        if(!location){
            new IntersectionObserver("Location not found");
        }
        const updatedlocation = await locationModel.findByIdAndUpdate(id,data,{new:true},{$set:true})
        return updatedlocation
    }

    async deleteLocation(id){
        return   await locationModel.findByIdAndDelete(id);
    }
}