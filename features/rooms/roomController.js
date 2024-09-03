import RoomService from "./roomService.js";
import appResponse from "../../lib/appResponse.js"
import {InternalServerError, NotFoundError} from "../../lib/appError.js"

const {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
 deleteRoom

} = new RoomService();
export default class RoomController {
    async createRoom(req,res,next){
        try{
            const savedRoom = await createRoom(req.body);
            res.send(appResponse("Room created successfully", savedRoom));
            console.log(savedRoom)
        }catch(error){
            console.log(error);
            next(new InternalServerError("Internal server error",error));
        }
    }
    async updatedRoom(req, res, next) {
        try {
            const updatedRoom = await updateRoom(req.params.id, req.body);
            
            if (!updatedRoom) {
                return next(new NotFoundError("Room not found"));
            }
            
            res.status(200).send(appResponse("Room updated successfully", updatedRoom));
        } catch (error) {
            console.log(error);
            next(new InternalServerError("Internal server error"));
        }
    }
    
    
    async deleteRoom(req,res,next){
        try{
            await deleteRoom(req.params.id, req.body);
           res.send(appResponse("Room deleted successfully"))
        }catch(error){
           console.log(error);
           next(new InternalServerError("Internal server error"));
        }
   }
   
   async getRoom(req,res,next){
    try{
        const room = await getRoom(req.params.id);
       res.send(appResponse("room retrieved successfully",room))
       console.log(room)
    }catch(error){
       console.log(error);
       next(new InternalServerError("Internal server error"));
    }
}
async getRooms(req,res,next){
    try{
        const rooms = await getRooms(req.query);
       res.send(appResponse("rooms retrieved successfully",hotels))
       console.log(rooms)
    }catch(error){
       console.log(error);
       next(new InternalServerError("Internal server error"));
    }
}

}  
    


