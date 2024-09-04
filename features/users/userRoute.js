import { Router } from "express";
const userRouter = Router();
import UserController from './userController.js';
import authenticate from "../../middlewares/auth.middle.js";
import { validateEdit, validateSignIn, validateSignUp } from "../../validator/userValidator.js";


const {
    createUser,
    getUserById,
    getUsers,
    editUserById,
    deleteById,
    login,
    logout,
    sendResetLink,
    resetPassword
} = new UserController();

userRouter.post("/signup", validateSignUp, createUser);

userRouter.post("/signin", validateSignIn, login);

userRouter.get("/:userId", authenticate, getUserById);


userRouter.get("/", authenticate, getUsers);

userRouter.patch("/:userId",authenticate, validateEdit, editUserById);

userRouter.delete("/:userId", authenticate, deleteById);

userRouter.post("/logout",  logout);

userRouter.put('/forgot-password', sendResetLink);

userRouter.put('/reset-password/:token',authenticate, resetPassword);

export default userRouter;