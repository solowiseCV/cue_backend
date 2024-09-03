
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    hotel_id: {type: mongoose.Schema.Types.ObjectId, ref:"Hotel"},
    rental_id :{type:mongoose.Schema.Types.ObjectId, ref: "Rental"},
    user_id :{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    subTotal: {type: Number, required: true},
    total : {type: Number,required :true},
    tax: {type: Number,default: 0},
})

export default mongoose.model("Cart",cartSchema);