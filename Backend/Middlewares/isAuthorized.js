require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require("../Models/userModel");

module.exports.isAuthorized = async (req, res, next) => {
    try {
        const token =req?.cookies?.token;
        
       
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }   
        // Verify token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        req.userId= decoded.id;
        const user = await userModel.findById(req.userId);
        if(user.role !== "admin" && user.role !== "department"){
            return res.status(403).json({ message: 'Forbidden: Admins and Department users only' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}   
