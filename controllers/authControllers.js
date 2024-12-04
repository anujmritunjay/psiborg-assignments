const { getHashPassword, checkPassword, getToken } = require("../services/authService")
const User = require('../models/userModel')
const ErrorHandler = require('../utilities/errorHandler');
const { userSignUpTemplate } = require("../templates/signUp");
const { sendEmail } = require("../utilities/emailHelper");

exports.addUser = async (req, res, next) => {
    try {
        const payload = req.body;
        const userData = await User.findOne({ 
            $or: [{ email: payload.email }, { username: payload.username }]
        });
        if (userData && userData.id) {
            return next(new ErrorHandler("User already exists", 401));
        }
        const hashPassword = await getHashPassword(payload.password);
        payload.password = hashPassword;
        const user = await User.create(payload);
        const template = userSignUpTemplate({name: payload.username})
        const mailObj = {
            to: payload.email,
            subject: `Welcome to PsiBorg`,
            html: template
        }
        await sendEmail(mailObj)
        delete user.password; 
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        return next(error);
    }
}

exports.logIn = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ 
            $or: [{ email: username }, { username: username }]
        });
        if (!user) {
            return next(new ErrorHandler("Invalid credentials.", 403))
        }
        const isPasswordMatch = await checkPassword(password, user.password)
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid credentials.", 403))
        }
        const token = getToken({ _id: user.id })
        res.json({
            success: true,
            user: user,
            token: token
        })

    } catch (error) {
        return next(error)
    }
}

exports.me = async (req, res, next) => {
    try {
        const user = req.user
        res.json({
            success: true,
            data: user,
        })
    } catch (error) {
        return next(error)
    }
}

exports.logout = (req, res) => {
      res.json({
      success: true,
      message: "User logged out successfully. Please remove the token from storage."
    });
  };