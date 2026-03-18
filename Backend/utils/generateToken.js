const jwt = require('jsonwebtoken');


module.exports.generateToken = async (user) => {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}