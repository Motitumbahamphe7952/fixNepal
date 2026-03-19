require('dotenv').config();

const express = require("express");
const cors = require('cors');
const app = express();

const authRoutes = require('./Routes/authRoutes');


const ConnnectDB = require('./Config/dbConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Auth Api
app.get('/', (req, res) => {
    res.send('Hello World!');
})

 
app.use('/api/auth', authRoutes);
// app.use("/api/complaint",)






const port = 3000;
app.listen(port, () => {
  ConnnectDB();
  console.log(`Server is running on port ${port}`);
});