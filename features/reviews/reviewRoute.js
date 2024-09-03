import { Router } from "express";
import ReviewController from "./reviewController.js";
import {
  validateCreateReview,
  validateUpdateReview,
} from "../../validator/reviewValidation.js";
import authenticate from "../../middlewares/auth.middle.js";

const reviewRouter = Router();
const {
  createReview,
  getReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewsByHotel,
} = new ReviewController();

reviewRouter.post("/:hotel_id",validateCreateReview, authenticate, createReview);

reviewRouter.get("/:id", getReview);

reviewRouter.put(
  "/:id",
  validateUpdateReview,
  validateUpdateReview,
  updateReview
);

reviewRouter.delete("/:id", deleteReview);

reviewRouter.get("/", getAllReviews);

reviewRouter.get("/hotel/:hotelId", getReviewsByHotel);

export default reviewRouter;
