import Joi from 'joi';

// Joi schema for creating a review
const createReviewSchema = Joi.object({ 
    comment: Joi.string().required(),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
});

// Joi schema for updating a review
const updateReviewSchema = Joi.object({
    user_id: Joi.string().optional(),
    hotel_id: Joi.string().optional(),
    comment: Joi.string().optional(),
    updated_at: Joi.date().optional().default(Date.now),
}).min(1); 

export const validateCreateReview = (req, res, next) => {
    const { error } = createReviewSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    next();
};

// Middleware function for review update validation
export const validateUpdateReview = (req, res, next) => {
    const { error } = updateReviewSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    next();
};
