const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
    cin: {
        type : String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
    },
    relatives: {
        type: [String],
        default: []
    },
    email: {
        type: String,
        unique: true
    },
    insurance: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const peopleModel = mongoose.model("people", peopleSchema);

module.exports = peopleModel;