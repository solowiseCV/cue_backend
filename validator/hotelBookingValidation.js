import Joi from 'joi';

// Joi schema for creating a hotel booking
const createHotelBookingSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'string.base': 'User ID should be a valid string',
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required',
  }),
  hotel_id: Joi.string().required().messages({
    'string.base': 'Hotel ID should be a valid string',
    'string.empty': 'Hotel ID is required',
    'any.required': 'Hotel ID is required',
  }),
  check_in: Joi.date().required().messages({
    'date.base': 'Check-in date should be a valid date',
    'any.required': 'Check-in date is required',
  }),
  check_out: Joi.date().optional().messages({
    'date.base': 'Check-out date should be a valid date',
    'any.required': 'Check-out date is required',
  }),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled').default('pending').messages({
    'string.base': 'Status should be a valid string',
    'any.only': 'Status must be one of [pending, confirmed, cancelled]',
  }),
  payment_status: Joi.string().valid('pending', 'paid', 'failed').default('pending').messages({
    'string.base': 'Payment status should be a valid string',
    'any.only': 'Payment status must be one of [pending, paid, failed]',
  }),
  total_amount: Joi.number().required().messages({
    'number.base': 'Total amount should be a valid number',
    'any.required': 'Total amount is required',
  }),
  room_type: Joi.string().optional().messages({
    'string.base': 'Room type should be a valid string',
  }),
  number_of_guests: Joi.number().integer().optional().messages({
    'number.base': 'Number of guests should be a valid integer',
  }),
  special_requests: Joi.string().optional().messages({
    'string.base': 'Special requests should be a valid string',
  }),
  booking_date: Joi.date().optional().messages({
    'date.base': 'Booking date should be a valid date',
  }),
  payment_method: Joi.string().optional().messages({
    'string.base': 'Payment method should be a valid string',
  }),
  cancellation_policy: Joi.string().optional().messages({
    'string.base': 'Cancellation policy should be a valid string',
  }),
  contact_info: Joi.object().optional().messages({
    'string.base': 'Contact info should be a valid objdect',
  }),
  booking_reference: Joi.string().optional().messages({
    'string.base': 'Booking reference should be a valid string',
  }),
});

// Joi schema for updating a hotel booking
const updateHotelBookingSchema = Joi.object({
  user_id: Joi.string().optional().messages({
    'string.base': 'User ID should be a valid string',
  }),
  hotel_id: Joi.string().optional().messages({
    'string.base': 'Hotel ID should be a valid string',
  }),
  check_in: Joi.date().optional().messages({
    'date.base': 'Check-in date should be a valid date',
  }),
  check_out: Joi.date().optional().messages({
    'date.base': 'Check-out date should be a valid date',
  }),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled').optional().messages({
    'string.base': 'Status should be a valid string',
    'any.only': 'Status must be one of [pending, confirmed, cancelled]',
  }),
  payment_status: Joi.string().valid('pending', 'paid', 'failed').optional().messages({
    'string.base': 'Payment status should be a valid string',
    'any.only': 'Payment status must be one of [pending, paid, failed]',
  }),
  total_amount: Joi.number().optional().messages({
    'number.base': 'Total amount should be a valid number',
  }),
  room_type: Joi.string().optional().messages({
    'string.base': 'Room type should be a valid string',
  }),
  number_of_guests: Joi.number().integer().optional().messages({
    'number.base': 'Number of guests should be a valid integer',
  }),
  special_requests: Joi.string().optional().messages({
    'string.base': 'Special requests should be a valid string',
  }),
  booking_date: Joi.date().optional().messages({
    'date.base': 'Booking date should be a valid date',
  }),
  payment_method: Joi.string().optional().messages({
    'string.base': 'Payment method should be a valid string',
  }),
  cancellation_policy: Joi.string().optional().messages({
    'string.base': 'Cancellation policy should be a valid string',
  }),
  contact_info: Joi.string().optional().messages({
    'string.base': 'Contact info should be a valid string',
  }),
  booking_reference: Joi.string().optional().messages({
    'string.base': 'Booking reference should be a valid string',
  }),
}).min(1); // Ensure at least one field is being updated

// Middleware function for hotel booking creation validation
export const validateCreateHotelBooking = (req, res, next) => {
  const { error } = createHotelBookingSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for hotel booking update validation
export const validateUpdateHotelBooking = (req, res, next) => {
  const { error } = updateHotelBookingSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};
