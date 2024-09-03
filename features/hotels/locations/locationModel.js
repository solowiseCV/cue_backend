import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    hotelId : {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel",
        required:[true,"provide the hotelId"]
    },

    name:{
        type: String,
        required:[true,"provide the name of the this location"]
    },
    state:{
        type: String,
        required:[true,"provide the state of the this location"]
    },
    image_url:{
        type: String,
        required:[true,"provide the image of the this location"]
    },
    description: {
        type: String,
        required:[true,"Provide the description"]
    },
    rating: {type: Number,
       
         enum:[1,2,3,4,5]
    },
    numberOfRating: {
        type: Number,
        enum: [1,2,3,4,5]
    }

},{timestamps:true});

export default mongoose.model("Location",locationSchema)