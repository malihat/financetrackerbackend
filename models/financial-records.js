import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
    // id: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    receipt: {type: String }
},
    {
        timestamps: true
    }
)

export const FinanceRecordModel = mongoose.model('finance', financeSchema);


// const FinanceRecordModel = mongoose.model('FinanceRecordModel', financeSchema);

// export default FinanceRecordModel;

// module.exports = mongoose.model('FinanceRecordModel', financeSchema);  