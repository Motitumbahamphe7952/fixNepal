const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Auth Api
app.get("/",(req,res)=>{
  res.send("Hello World");
});






const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});