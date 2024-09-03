import Joi from 'joi';

// Joi schema for creating trip
const createTripSchema = Joi.object({
    user_id: Joi.string().required(),
    hotel_id: Joi.string().required(),
    destination_id: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    activities: Joi.array().items(Joi.string()).optional(),
    created_at: Joi.date().optional(),
    updated_at: Joi.date().optional(),
});

// Joi schema for updating trip
const updateTripSchema = Joi.object({
    hotel_id: Joi.string().optional(),
    destination_id: Joi.string().optional(),
    start_date: Joi.date().optional(),
    end_date: Joi.date().optional(),
    activities: Joi.array().items(Joi.string()).optional(),
    updated_at: Joi.date().optional().default(Date.now),
}).min(1);

export const validateCreateTrip = (req, res, next) => {
    const { error } = createTripSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    next();
};

export const validateUpdateTrip = (req, res, next) => {
    const { error } = updateTripSchema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }
    next();
};
