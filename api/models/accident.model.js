const mongoose = require('mongoose');

const accidentSchema = new mongoose.Schema(
    {
        victims: {
            type: [String],
            required: true
        },
        injured: {
            type: [String],
            required: true
        },
        severity: {
            type: String,
        },
        latitude: {
            type: Number, 
            required: true
        },
        longitude: { 
            type: Number, 
            required: true
        },
        vehicles: {
            type: [String],
            required: true
        }  
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('accident', accidentSchema);