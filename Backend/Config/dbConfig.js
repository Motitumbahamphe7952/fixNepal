require("dotenv").config();
const mongoose = require('mongoose');

const ConnnectDB = async ()=>{
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("connect to mongodb")
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = ConnnectDB