const Joi = require('joi');

const addTaskValidation = Joi.object({
  title: Joi.string().required().example('Complete the project'),
  description: Joi.string().required().example('Finish the project by the end of the month'),
  dueDate: Joi.date().iso().required().example('2024-12-31T23:59:59Z'),
  priority: Joi.string().valid('low', 'medium', 'high').required().example('high'),
  status: Joi.string().valid('not started', 'in progress', 'completed').default('not started'),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(5).max(1000).required(),
  due_date: Joi.date().iso().required(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  status: Joi.string().valid('not started', 'in progress', 'completed'),
});

const assignTaskSchema = Joi.object({
  userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.pattern.base': 'Invalid user ID format',
    'any.required': 'User ID is required',
  }),
});

module.exports = updateTaskSchema;


module.exports = {addTaskValidation, updateTaskSchema, assignTaskSchema};
