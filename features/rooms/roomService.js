import roomModel from './roomModel.js';
import hotelModel from '../hotels/hotelModel.js';

export default class RoomService {

    async createRoom(roomData) {
        const room = await roomModel.create(roomData);

        await hotelModel.findByIdAndUpdate(roomData.hotelId, {
            $push: { rooms: room._id }
        });

        return room;
    }

    async updateRoom(id, updateRoomData) {
        return await roomModel.findByIdAndUpdate(id, updateRoomData, {
            new: true,
            set: true
        });
    }

    async getRoom(id) {
        return await roomModel.findById(id);
    }

    async getRooms() {
        return await roomModel.find();
    }

    async deleteRoom(id) {
        const deletedRoom = await roomModel.findByIdAndDelete(id);
        if (deletedRoom) {
            await hotelModel.findByIdAndUpdate(deletedRoom.hotelId, {
                $pull: { rooms: deletedRoom._id }
            });
        }
        return deletedRoom;
    }

    /*
    async bookRoom(hotelId, roomId) {
        const hotel = await hotelModel.findById(hotelId);

        if (!hotel) {
            throw new Error('Hotel not found');
        }

        const roomCount = hotel.rooms.length;

        if (roomCount > 1) {
            // Room is available; proceed with booking
            const room = await roomModel.findById(roomId);
            
            if (room) {
                // Remove one room from the hotel's rooms field to represent booking
                await hotelModel.findByIdAndUpdate(hotelId, {
                    $pull: { rooms: roomId }
                });

                return {
                    message: 'Room booked successfully',
                    room,
                    remainingRooms: roomCount - 1
                };
            } else {
                throw new Error('Room not found');
            }
        } else {
            throw new Error('No more rooms available');
        }
    }
    */
}
