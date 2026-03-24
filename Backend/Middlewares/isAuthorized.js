require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require("../Models/userModel");

exports.isAuthorized = (...roles) => {
  return async (req, res, next) => {
        const token =req?.cookies?.token;
        
       
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }   
        // Verify token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        req.userId= decoded.id;
        const user = await userModel.findById(req.userId);

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};

