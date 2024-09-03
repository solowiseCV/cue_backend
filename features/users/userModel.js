import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "User email is required"],
    unique: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "User Password is required"],
  },
  fullname: {
    type: String,

  },
  resetToken: {
    type: String,
    required: false,
    unique:false
  },
  tokenExpiration:{
    type: Date,
    required: false,
    unique:false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

},{timestamps:true});



const User = mongoose.model('User', userSchema);
export default User;
