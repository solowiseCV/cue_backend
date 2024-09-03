import Joi from 'joi';

// Joi schema for creating a destination
const createDestinationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required.',
    'any.required': 'Name is a required field.'
  }),
  description: Joi.string().optional().messages({
    'string.empty': 'Description cannot be empty.'
  }),
  state: Joi.string().required().messages({
    'string.empty': 'State is required.',
    'any.required': 'State is a required field.'
  }),
  popular: Joi.boolean().optional(),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required.',
    'any.required': 'Location is a required field.'
  }),
  region: Joi.string().optional().messages({
    'string.empty': 'Region cannot be empty.'
  }),
  latitude: Joi.number().optional().messages({
    'number.base': 'Latitude must be a number.'
  }),
  longitude: Joi.number().optional().messages({
    'number.base': 'Longitude must be a number.'
  }),
  image_url: Joi.string().optional().uri().messages({
    'string.uri': 'Image URL must be a valid URI.'
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    'number.base': 'Rating must be a number.',
    'number.min': 'Rating cannot be less than 0.',
    'number.max': 'Rating cannot be more than 5.'
  }),
  created_at: Joi.date().optional().messages({
    'date.base': 'Created at must be a valid date.'
  }),
  updated_at: Joi.date().optional().messages({
    'date.base': 'Updated at must be a valid date.'
  }),
});

// Joi schema for updating a destination
const updateDestinationSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.empty': 'Name cannot be empty.'
  }),
  description: Joi.string().optional().messages({
    'string.empty': 'Description cannot be empty.'
  }),
  state: Joi.string().optional().messages({
    'string.empty': 'State cannot be empty.'
  }),
  popular: Joi.boolean().optional().messages({
    'string.empty': 'State cannot be empty.'
  }),
  location: Joi.string().optional().messages({
    'string.empty': 'Location cannot be empty.'
  }),
  region: Joi.string().optional().messages({
    'string.empty': 'Region cannot be empty.'
  }),
  latitude: Joi.number().optional().messages({
    'number.base': 'Latitude must be a number.'
  }),
  longitude: Joi.number().optional().messages({
    'number.base': 'Longitude must be a number.'
  }),
  image_url: Joi.string().optional().uri().messages({
    'string.uri': 'Image URL must be a valid URI.'
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    'number.base': 'Rating must be a number.',
    'number.min': 'Rating cannot be less than 0.',
    'number.max': 'Rating cannot be more than 5.'
  }),

  created_at: Joi.date().optional().messages({
    'date.base': 'Created at must be a valid date.'
  }),
  updated_at: Joi.date().optional().default(Date.now).messages({
    'date.base': 'Updated at must be a valid date.'
  }),
}).min(1).messages({
  'object.min': 'At least one field must be updated.'
});

// Middleware function for destination creation validation
export const validateCreateDestination = (req, res, next) => {
  const { error } = createDestinationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for destination update validation
export const validateUpdateDestination = (req, res, next) => {
  const { error } = updateDestinationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};
