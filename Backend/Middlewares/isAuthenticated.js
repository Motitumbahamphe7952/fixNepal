require('dotenv').config();
const jwt = require('jsonwebtoken');




module.exports.isAuthenticated = (req, res, next) => {
    try {
        const token =req?.cookies?.token;
        
       
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }   
        // Verify token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        req.userId= decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}   
