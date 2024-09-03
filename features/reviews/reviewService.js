import Review from './reviewModel.js';

export default class ReviewService {
    async createReview(reviewData) {

        // const bookingExists = await HotelBooking.exists({
        //     user_id: reviewData.user_id,
        //     hotel_id: reviewData.hotel_id,
        //     status: 'confirmed', 
        // });

        // if (!bookingExists) {
        //     throw new Error('User has not booked this hotel and cannot leave a review.');
        // }

        const review = new Review(reviewData);
        return await review.save();
    }

    async getReviewById(reviewId) {
        return await Review.findById(reviewId).populate('user_id').populate('hotel_id');
    }

    async updateReview(reviewId, updateData) {
        return await Review.findByIdAndUpdate(reviewId, updateData, { new: true });
    }

    async deleteReview(reviewId) {
        return await Review.findByIdAndDelete(reviewId);
    }

    async getAllReviews(query = {}) {
        return await Review.find(query).populate('user_id').populate('hotel_id');
    }

    async getReviewsByHotel(hotelId) {
        return await Review.find({ hotel_id: hotelId }).populate('user_id');
    }
}
