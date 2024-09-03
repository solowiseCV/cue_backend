import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    full_name:{type:String, required:true},
    email:{type:String, required:true },
    amount: { type: Number, required: true, default: 0.0},
    status: { type: String, required: true },
    reference:{type: String, required:true, unique:true}

},{timestamp:true});

export default mongoose.model('Payment', PaymentSchema);
