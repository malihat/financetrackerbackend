import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import financialRecordRouter from './routes/financialRecordRouter.js'
import newTotalRouter from './routes/newTotalRouter.js';
 
dotenv.config();
const app = express();


app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 7000

// app.use(cors()); // Allows requests from different origins
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://financetrackerfrontend.vercel.app/");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });
app.use("/uploads", express.static("uploads"));
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));


// Define a basic route

app.use('/', financialRecordRouter);
app.use('/api', newTotalRouter);

// Connect to Mongodb
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Not connected to Mongodb: ", err.message))


app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))