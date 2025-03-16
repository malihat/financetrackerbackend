// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


// import {FinanceRecordModel} from './models/financial-records.js'
import financialRecordRouter from './routes/financialRecordRouter.js'
import newTotalRouter from './routes/newTotalRouter.js';
 
dotenv.config();
const app = express();


app.use('/uploads', express.static('uploads'));


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 7000

app.use(cors()); // Allows requests from different origins
app.use(express.json()); // Middleware to parse JSON requests

// Define a basic route

app.use('/', financialRecordRouter);
// app.use('/total', newTotalRouter);
app.use('/api', newTotalRouter);

// Connect to Mongodb
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Not connected to Mongodb: ", err.message))


app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))