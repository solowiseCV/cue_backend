import Joi from 'joi';

// Joi schema for creating a flight
const createFlightSchema = Joi.object({
  airline: Joi.string().required(),
  flight_number: Joi.string().required(),
  departure_city: Joi.string().required(),
  arrival_city: Joi.string().required(),
  departure_date: Joi.date().required(),
  arrival_date: Joi.date().required(),
  price: Joi.number().required(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional(),
});

// Joi schema for updating a flight
const updateFlightSchema = Joi.object({
  airline: Joi.string().optional(),
  flight_number: Joi.string().optional(),
  departure_city: Joi.string().optional(),
  arrival_city: Joi.string().optional(),
  departure_date: Joi.date().optional(),
  arrival_date: Joi.date().optional(),
  price: Joi.number().optional(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional().default(Date.now),
}).min(1); // Ensure at least one field is being updated

// Middleware function for flight creation validation
export const validateCreateFlight = (req, res, next) => {
  const { error } = createFlightSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for flight update validation
export const validateUpdateFlight = (req, res, next) => {
  const { error } = updateFlightSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};
