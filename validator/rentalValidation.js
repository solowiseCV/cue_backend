import Joi from "joi";

// Joi schema for creating a rental
const createRentalSchema = Joi.object({
  user_id: Joi.string().required(),
  leaving_from: Joi.string().required(),
  driver_number: Joi.string().required(),
  rental_plate_number: Joi.string().required(),
  image_url: Joi.string().required(),
  rental_date: Joi.date().required(),
  return_date: Joi.date().required(),
  available: Joi.boolean().required(),
  rental_time: Joi.string().required(),
  rental_amount: Joi.number().required(),
  status: Joi.string()
    .valid("pending", "cancelled", "confirmed")
    .default("pending")
    .required(),
  number_of_seats: Joi.number().required(),
  air_conditioned: Joi.boolean().default(false),
  brand: Joi.string()
    .valid("Toyota", "Honda", "Ford", "BMW", "Mercedes", "Other")
    .required(),
  condition: Joi.string()
    .valid("Brand New", "Nigerian Drive", "Foreign Used")
    .required(),
});

// Joi schema for updating a rental

// Update Validation Schema
const updateRentalSchema = Joi.object({
  user_id: Joi.string(),
  leaving_url: Joi.string(),
  driver_number: Joi.string(),
  rental_plate_number: Joi.string(),
  leaving_from: Joi.string(),
  image_url: Joi.string(),
  rental_date: Joi.date(),
  return_date: Joi.date(),
  available: Joi.boolean(),
  rental_time: Joi.string(),
  rental_amount: Joi.number(),
  status: Joi.string().valid("pending", "cancelled", "confirmed"),
  number_of_seats: Joi.number(),
  air_conditioned: Joi.boolean(),
  brand: Joi.string().valid(
    "Toyota",
    "Honda",
    "Ford",
    "BMW",
    "Mercedes",
    "Other"
  ),
  condition: Joi.string().valid("Brand New", "Nigerian Drive", "Foreign Used"),
}).min(1);

// Middleware function for rental creation validation
export const validateCreateRental = (req, res, next) => {
  const { error } = createRentalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware function for rental update validation
export const validateUpdateRental = (req, res, next) => {
  const { error } = updateRentalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
