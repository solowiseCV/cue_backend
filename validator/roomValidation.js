import Joi from 'joi';

// Joi schema for creating a room
const createRoomSchema = Joi.object({
  type: Joi.string().required(),
  price: Joi.number().required(),
  hotel_id: Joi.string().required(),  // Assuming hotel_id is passed as a string (ObjectId)
  description: Joi.string().optional(),
  amenities: Joi.array().items(Joi.string()).optional(),
  availability: Joi.boolean().default(true),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional(),
});

// Joi schema for updating a room
const updateRoomSchema = Joi.object({
  type: Joi.string().optional(),
  price: Joi.number().optional(),
  hotel_id: Joi.string().optional(),
  description: Joi.string().optional(),
  amenities: Joi.array().items(Joi.string()).optional(),
  availability: Joi.boolean().optional(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional().default(Date.now),
}).min(1); // Ensure at least one field is being updated

// Middleware function for room creation validation
export const validateCreateRoom = (req, res, next) => {
  const { error } = createRoomSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for room update validation
export const validateUpdateRoom = (req, res, next) => {
  const { error } = updateRoomSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};
