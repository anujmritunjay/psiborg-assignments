const moment = require('moment-timezone'); 
const express = require('express')
const router = require('./routes/routes')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit');
const errorMiddleware = require('./middlewares/errorMiddleware')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/index')

const PORT = process.env.PROT || 4040
const URI = process.env.DB

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express()
app.use(limiter);
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const serverStartTime = moment().tz('Asia/Kolkata').format('DD-MM-YYYY, hh:mm A');
app.get('/', (req, res) => {
  const serverName = "PsiBorg Assignment";
  res.json({
    upTime: serverStartTime,
    serverName: serverName
  });
});

app.use('/api',router)

mongoose.connect(URI).then(()=> console.log('Database connected successfully.')).catch(err=>console.log(err))

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
app.use(errorMiddleware)