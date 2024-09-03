import jwt from "jsonwebtoken";
import User from "../features/users/userService.js";
const UserService = new User();
import env from '../configs/env.js';


// check if json web token exists & is verified
export default function authenticate(req, res, next){
    let token = req.cookies.token;
 
    if (!token) {
        return res.status(401)
            .send({
                success: false,
                message: "Invalid token or no token"
            });
    }
    jwt.verify(token, env.jwt_key, async (err, decoded) => {
        if (err) {
            return res.status(401)
                .send({ 
                    success: false,
                    message: "Invalid token"
                });
        } else {
            const user = await UserService.findById(decoded.id);
            if(!user) {
                return res.status(401)
                .send({ 
                    success: false,
                    message: "Invalid Id"
                });
            }
            // Add the decoded token to the request object for future use
            req.user = decoded;
            next();
        }
    });
}