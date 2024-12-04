const Joi = require('joi');

const addUserValidation = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
    }),
  role: Joi.string().valid('admin', 'user', 'manager').optional()
});


const logInValidation = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
    "string.empty": "Username is required"  
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password is required"  
  }),
})

module.exports = { addUserValidation, logInValidation };
