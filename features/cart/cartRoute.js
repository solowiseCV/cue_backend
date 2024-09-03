
import express from "express";
import cartController from "./cartService.js";
import authenticate from "../../middlewares/auth.middle.js";

const cartRouter = express.Router();

cartRouter.post("/", authenticate, cartController.createCart.bind(cartController));
cartRouter.get("/", cartController.getAllCarts.bind(cartController));
cartRouter.get("/:id", cartController.getCartById.bind(cartController));
cartRouter.put("/:id",authenticate, cartController.updateCart.bind(cartController));
cartRouter.delete("/:id", cartController.deleteCart.bind(cartController));

export default cartRouter;
