import Joi from 'joi';

// Joi schema for creating a personal security service
const createPersonalSecuritySchema = Joi.object({
  user_id: Joi.string().required(),
  booking_id: Joi.string().required(), 
  security_provider: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  amount: Joi.number().required(),
  status: Joi.string().valid('active', 'inactive', 'completed').required(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional(),
});

// Joi schema for updating a personal security service
const updatePersonalSecuritySchema = Joi.object({
  user_id: Joi.string().optional(),
  booking_id: Joi.string().optional(),
  security_provider: Joi.string().optional(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional(),
  amount: Joi.number().optional(),
  status: Joi.string().valid('active', 'inactive', 'completed').optional(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional().default(Date.now),
}).min(1); // Ensure at least one field is being updated

// Middleware function for personal security creation validation
export const validateCreatePersonalSecurity = (req, res, next) => {
  const { error } = createPersonalSecuritySchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for personal security update validation
export const validateUpdatePersonalSecurity = (req, res, next) => {
  const { error } = updatePersonalSecuritySchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};
