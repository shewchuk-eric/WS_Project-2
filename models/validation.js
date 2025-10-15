const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[0-9\-\+]{9,15}$/).required(),
    lastOrderDate: Joi.string().allow('').optional()
});

module.exports = { userSchema };