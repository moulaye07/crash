const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            default: "Car"
        },
        company: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Insurance', insuranceSchema);