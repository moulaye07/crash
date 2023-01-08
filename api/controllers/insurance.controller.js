const insuranceModel = require('../models/insurance.model');

module.exports.createInsurance = async (req, res) => {
    const newInsurance = new insuranceModel({
        company: req.body.company,
        phone: req.body.phone
    });
    try {
        const insurance = await newInsurance.save();
        return res.status(201).json(insurance);
    } catch (err) {
        console.log(err)
        return res.status(201).json(err)   
    }  
};

module.exports.getInsurances = async (req,res) => {
    const insurance = await insuranceModel.find();
    res.status(200).json(insurance);
}

module.exports.getInsuranceData = (req,res) => {
    insuranceModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Identifiant inconnu : ' + err);
    });
}