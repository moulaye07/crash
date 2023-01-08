const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
    {
        owner: {
            type: String,
            required: true
        },
        plaque: {
            type: String,
            required: true
        },
        marque: {
            type: String,
        },
        modele: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Car', carSchema);