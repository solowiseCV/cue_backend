import express from 'express'
import RoomController from './roomController.js';
import authenticate from '../../middlewares/auth.middle.js';
import { validateCreateRoom, validateUpdateRoom } from '../../validator/roomValidation.js';

const {
  createRoom,
  updatedRoom,
  deleteRoom,
  getRoom,
  getRooms,

} = new RoomController();

const roomRoute = express.Router();

roomRoute.post("/",validateCreateRoom, createRoom);
roomRoute.delete("/:id",authenticate,deleteRoom);
roomRoute.get("/:id",authenticate,getRoom);
roomRoute.get("/:id",authenticate,validateUpdateRoom, updatedRoom);
roomRoute.get("/",authenticate,getRooms);


export default roomRoute;