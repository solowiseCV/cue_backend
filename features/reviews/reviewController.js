import ReviewService from "./reviewService.js";
import appResponse from "../../lib/appResponse.js";
import { InternalServerError, NotFoundError } from "../../lib/appError.js";

const {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviews,
  getReviewsByHotel,
} = new ReviewService();

export default class ReviewController {
  async createReview(req, res, next) {
    
    try {
        const userId = req.user.id;
        const hotelId = req.body.hotel_id || req.params.hotel_id;
 

        const reviewData = {
            ...req.body,
            user_id: req.user.id,
            hotel_id: hotelId
        };
        const review = await createReview(reviewData);
        
        res.status(201).send(appResponse("Review created successfully", review));
    } catch (error) {
        next(new InternalServerError("Internal server error", error));
    }
}


  async getReview(req, res, next) {
    try {
      const review = await getReviewById(req.params.id);
      if (!review) {
        return next(new NotFoundError("Review not found"));
      }
      res.send(appResponse("Review retrieved successfully", review));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async updateReview(req, res, next) {
    try {
      const updatedReview = await updateReview(req.params.id, req.body);
      if (!updatedReview) {
        return next(new NotFoundError("Review not found"));
      }
      res.send(appResponse("Review updated successfully", updatedReview));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async deleteReview(req, res, next) {
    try {
      await deleteReview(req.params.id);
      res.send(appResponse("Review deleted successfully"));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async getAllReviews(req, res, next) {
    try {
      const reviews = await getAllReviews(req.query);
      res.send(appResponse("All reviews retrieved successfully", reviews));
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }

  async getReviewsByHotel(req, res, next) {
    try {
      const reviews = await getReviewsByHotel(req.params.hotelId);
      res.send(
        appResponse("Reviews for hotel retrieved successfully", reviews)
      );
    } catch (error) {
      next(new InternalServerError("Internal server error", error));
    }
  }
}
