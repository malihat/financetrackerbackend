import express from "express";
import {FinanceRecordModel} from "../models/financial-records.js";
import multer from 'multer';

const router = express.Router();

// const upload = multer({dest: 'uploads/'})
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() 
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});


// Route for Saving a record
router.post('/', upload.single("receipt"), async (req, res) => {
    try {
        const {date, description, amount, category, paymentMethod, receipt} = req.body;
        // const image = req.file.filename;
        // console.log(req.file)

        if (!date || !description || !amount || !category || !paymentMethod) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Get the file path for the uploaded image
        // const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; eq.file ? `/uploads/${req.file.filename}` : null

        const newItem = {
            date,
            description, 
            amount, 
            category, 
            paymentMethod,
            receipt
        }
        const savedItem = await FinanceRecordModel.create(newItem);
        return res.status(201).send(savedItem);
    } catch (error) {
        console.log(error);
    }
})


// Route to get the records
router.get('/', async (req, res) => {
    try {
        const records = await FinanceRecordModel.find();
        return res.status(200).json(records);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})



// Route to update
router.put('/:newId', async (req, res) => {
    try {
        const {id, date, description, amount, category, paymentMethod} = req.body;
        if (!id || !date || !description || !amount || !category || !paymentMethod) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const {newId} = req.params;
        const updatedItem = await FinanceRecordModel.findByIdAndUpdate(newId, req.body,  { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Record not found' });
        } else {
            return res.status(200).json(updatedItem);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

// Route to delete
router.delete('/:newId', async (req, res) => {
    try {
        const {newId} = req.params;
        const deletedItem = await FinanceRecordModel.findByIdAndDelete(newId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Record not found' });
        } else {
            return res.status(200).json({ message: 'Record deleted successfully' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})


export default router;
