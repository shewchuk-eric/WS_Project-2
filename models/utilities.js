const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[0-9\-\+]{9,15}$/).required(),
    lastOrderDate: Joi.string().allow('').optional()
});

function requireLogin(req, res, next) {
  if (req.session.isLoggedIn) {
    username = req.session.username;
    return(username); // User is logged in, continue to the route handler
  } else {
    return(false)
  }
}

function getToday() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const year = today.getFullYear();

    // Format the date as desired (e.g., MM/DD/YYYY)
    return formattedDate = `${year}-${month}-${day}`;
}



module.exports = { userSchema, requireLogin, getToday };