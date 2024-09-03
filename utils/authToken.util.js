import jwt from "jsonwebtoken";
import env from "../configs/env.js";

// Creates a JSON Web Token
export const generateAuthToken = (user) => {
    if (!user || !user._id || !user.email || !user.role) {
        throw new Error("Invalid user object provided for generating token");
    }

    try {
        return jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role
        }, env.jwt_key, {
            expiresIn: '3d' 
        });
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};
