const ErrorHandler = require("../utilities/errorHandler");

const checkRole = (roles) => (req, res, next) => {
    if(req.user.role === 'admin'){
        return next()
    }
    if (!roles.includes(req.user.role)) {
        return next(new ErrorHandler('You are not authorized to for this action'))
    }
    next();
};


module.exports = checkRole

