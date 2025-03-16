import express from "express";
import {newTotalModel} from '../models/newTotal-record.js';

const router = express.Router();

router.get('/total', async (req, res) => {
    try {
        const total = await newTotalModel.find();
        console.log(total);
        res.status(200).json(total);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

router.post('/total', async (req, res) => {
    const { total } = req.body;
    
    try {
        const existingTotal = await newTotalModel.findOne(); 
        if (existingTotal) {
            existingTotal.total = total; 
            await existingTotal.save();
            return res.status(201).json({total: existingTotal.total})
        } else {
            const newTotal = new newTotalModel({total});
            await newTotal.save();
            return res.status(201).json({total: newTotal.total})
        }
        // Check if total is present
        // if (!total) {
        //     return res.status(400).send({ error: 'Total data is required' });
        // }

        // Save the data to the database
        // const savedTotal = await newTotalModel.create({total});
        // return res.status(201).send(savedTotal);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({ error: 'An error occurred while saving total' });
    }
});


export default router;


// router.post('/total', async (req, res) => {
//     try {
//         const {total} = req.body;
//         console.log('This is Total: ', total);
//         const savedTotal = await newTotalModel.create(total);
//         return res.status(201).send(savedTotal);
        
//     } catch (error) {
//         console.log(error);

//     }
// })
