const moment = require('moment-timezone'); 
const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()

const PORT = process.env.PROT || 4040
const URI = process.env.DB

const app = express()
app.use(express.json())

const serverStartTime = moment().tz('Asia/Kolkata').format('DD-MM-YYYY, hh:mm A');
app.get('/', (req, res) => {
  const serverName = "PsiBorg Assignment";
  res.json({
    upTime: serverStartTime,
    serverName: serverName
  });
});

mongoose.connect(URI).then(()=> console.log('Database connected successfully.')).catch(err=>console.log(err))
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
