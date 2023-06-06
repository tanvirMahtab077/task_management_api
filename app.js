const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/user-routes')
const app = express();

dotenv.config();

// mongodb database connection
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
  app.listen(process.env.PORT)
  console.log("DB connected successfully")
}).catch(err=> console.log(err))

// adding middleware
app.use(express.json());
app.use('/api',router);