
const userModel = require('../Models/userModel');
const { hashPassword, comparePassword } = require('../utils/password');
const {generateToken} = require('../utils/generateToken');




module.exports.register = async(req, res) => {
  try {
      const { name ,phone, email, password,role } = req.body;

    // Validate input
    if (!name || !phone || !email || !password || !role ) {
        return res.status(400).json({ message: 'All fields are required' });
    }   
    const existingUser = await userModel.find({phone:phone});
    if(existingUser.length > 0){
        return res.status(400).json({ message: 'Phone number already exists' });
    }
    const newUser = await userModel.create({
        name,
        phone,
        email,
        password:hashPassword(password),
        role
    });
    let token = await generateToken(newUser);
    res.cookie("token",token)

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
     console.log(error.message);
     res.status(500).json({ message:error.message});
  }
}

module.exports.login = async(req, res) => {

    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ message: 'Phone and password are required' });
        }
        const user = await userModel.findOne({ phone: phone });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        const isPasswordValid = comparePassword(password,user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        let token = await generateToken(user);
        res.cookie("token",token)
        res.status(200).json({ message: 'Login successful', user });
        
    } catch (error) {
        res.status(500).json({ message:error.message});
    }
}

module.exports.logout = async(req, res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}