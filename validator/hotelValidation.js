import Joi from 'joi';

// Joi schema for room validation
const roomSchema = Joi.object({
  type: Joi.string().required().messages({
    'string.base': `"type" should be a type of string`,
    'string.empty': `"type" cannot be an empty field`,
    'any.required': `"type" is a required field`
  }),
  price: Joi.number().required().messages({
    'number.base': `"price" should be a type of number`,
    'any.required': `"price" is a required field`
  }),
});

// Joi schema for creating hotel
const createHotelSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `"name" should be a type of string`,
    'string.empty': `"name" cannot be an empty field`,
    'any.required': `"name" is a required field`
  }),
  type: Joi.string().required().messages({
    'string.base': `"type" should be a type of string`,
    'string.empty': `"type" cannot be an empty field`,
    'any.required': `"type" is a required field`
  }),
  city: Joi.string().required().messages({
    'string.base': `"city" should be a type of string`,
    'string.empty': `"city" cannot be an empty field`,
    'any.required': `"city" is a required field`
  }),
  state: Joi.string().required().messages({
    'string.empty': 'State is required.',
    'any.required': 'State is a required field.'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required.',
    'any.required': 'Location is a required field.'
  }),
  rating: Joi.number().min(0).max(5).messages({
    'number.base': `"rating" should be a type of number`,
    'number.min': `"rating" cannot be less than 0`,
    'number.max': `"rating" cannot be more than 5`
  }),
  description: Joi.string().optional().messages({
    'string.base': `"description" should be a type of string`
  }),
  destination_id: Joi.string().optional().messages({
    'string.base': `"destination_id" should be a type of string`
  }),  
  address: Joi.string().required().messages({
    'string.base': `"address" should be a type of string`,
    'string.empty': `"address" cannot be an empty field`,
    'any.required': `"address" is a required field`
  }),
  price_per_night: Joi.number().required().messages({
    'number.base': `"price_per_night" should be a type of number`,
    'any.required': `"price_per_night" is a required field`
  }),
  cheapestPrice: Joi.number().required().messages({
    'number.base': `"cheapestPrice" should be a type of number`,
    'any.required': `"cheapestPrice" is a required field`
  }),
  image_url: Joi.array().items(Joi.string().uri().messages({
    'string.base': `"image_url" should be a type of string`,
    'string.uri': `"image_url" must be a valid URL`
  })).optional().messages({
    'array.base': `"image_url" should be an array of strings`
  }),
  rooms: Joi.array().items(roomSchema).optional().messages({
    'array.base': `"rooms" should be an array`
  }),
  beach_view: Joi.boolean().optional().messages({
    'boolean.base': `"beach_view" should be a type of boolean`
  }),
  tv: Joi.boolean().optional().messages({
    'boolean.base': `"tv" should be a type of boolean`
  }),
  wifi: Joi.boolean().optional().messages({
    'boolean.base': `"wifi" should be a type of boolean`
  }),
  smart_home: Joi.boolean().optional().messages({
    'boolean.base': `"smart_home" should be a type of boolean`
  }),
  surveillance: Joi.boolean().optional().messages({
    'boolean.base': `"surveillance" should be a type of boolean`
  }),
  panic_button: Joi.boolean().optional().messages({
    'boolean.base': `"panic_button" should be a type of boolean`
  }),
  created_at: Joi.date().optional().messages({
    'date.base': `"created_at" should be a type of date`
  }),
  updated_at: Joi.date().optional().messages({
    'date.base': `"updated_at" should be a type of date`
  }),
});

// Joi schema for updating hotel
const updateHotelSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.base': `"name" should be a type of string`
  }),
  type: Joi.string().optional().messages({
    'string.base': `"type" should be a type of string`
  }),
  city: Joi.string().optional().messages({
    'string.base': `"city" should be a type of string`
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    'number.base': `"rating" should be a type of number`,
    'number.min': `"rating" cannot be less than 0`,
    'number.max': `"rating" cannot be more than 5`
  }),
  description: Joi.string().optional().messages({
    'string.base': `"description" should be a type of string`
  }),
  destination_id: Joi.string().optional().messages({
    'string.base': `"destination_id" should be a type of string`
  }),
  address: Joi.string().optional().messages({
    'string.base': `"address" should be a type of string`
  }),
  price_per_night: Joi.number().optional().messages({
    'number.base': `"price_per_night" should be a type of number`
  }),
  cheapestPrice: Joi.number().optional().messages({
    'number.base': `"cheapestPrice" should be a type of number`
  }),
  image_url: Joi.array().items(Joi.string().uri().messages({
    'string.base': `"image_url" should be a type of string`,
    'string.uri': `"image_url" must be a valid URL`
  })).optional().messages({
    'array.base': `"image_url" should be an array of strings`
  }),
  rooms: Joi.array().items(roomSchema).optional().messages({
    'array.base': `"rooms" should be an array`
  }),
  beach_view: Joi.boolean().optional().messages({
    'boolean.base': `"beach_view" should be a type of boolean`
  }),
  tv: Joi.boolean().optional().messages({
    'boolean.base': `"tv" should be a type of boolean`
  }),
  wifi: Joi.boolean().optional().messages({
    'boolean.base': `"wifi" should be a type of boolean`
  }),
  smart_home: Joi.boolean().optional().messages({
    'boolean.base': `"smart_home" should be a type of boolean`
  }),
  surveillance: Joi.boolean().optional().messages({
    'boolean.base': `"surveillance" should be a type of boolean`
  }),
  panic_button: Joi.boolean().optional().messages({
    'boolean.base': `"panic_button" should be a type of boolean`
  }),
  created_at: Joi.date().optional().messages({
    'date.base': `"created_at" should be a type of date`
  }),
  updated_at: Joi.date().optional().default(Date.now).messages({
    'date.base': `"updated_at" should be a type of date`
  }),
}).min(1).messages({
  'object.min': 'At least one field must be updated'
});

// Middleware function for hotel creation validation
export const validateCreateHotel = (req, res, next) => {
  const { error } = createHotelSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for hotel update validation
export const validateUpdateHotel = (req, res, next) => {
  const { error } = updateHotelSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};
