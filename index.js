const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const cors = require("cors")
const songRouter = require('./routes')

app.use(cors());
app.use(express.json());

// Import Routes
app.use("/api/v1/", songRouter);

mongoose.connect(process.env.MONGO_URL).then((res)=> console.log("Connected to DB")).catch((err)=>console.log(err))

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
