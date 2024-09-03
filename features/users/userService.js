import { InternalServerError } from "../../lib/appError.js";
import User from "./userModel.js";

export default class UserService {
    async findByEmail(email) {
        return User.findOne({ email: email }, "-__v -password");
    }

    async findByEmailWithP(email) {
        return User.findOne({ email: email }, "-__v");
    }

    async findOneByFilter(filter) {
        return User.findOne(filter, "-__v -password");
    }

    async createUser(user) {
        const _user = await User.create(user);
        return User.findOne({ _id: _user.id }, "-__v -password");
    }

    async findById(id) {
        return User.findOne({ _id: id }, "-__v -password");
    }

    async findAllById(id) {
        return User.findOne({ _id: id }, "-__v -password");
    }

    async getAllUsers() {
        const filter = {};
        return User.find(filter, "-__v -password").sort({ createdAt: 'desc' });
    }

    async editById(id, obj) {
        const userExists = await User.findOne({ _id: id });
        if (userExists) {
            return User.findByIdAndUpdate(id, { $set: obj }, { new: true }).select("-password");
        } else {
            throw new InternalServerError("User not found.");
        }
    }

    async deleteById(id) {
        return User.findByIdAndDelete(id);
    }
}
