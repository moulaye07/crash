const carModel = require('../models/car.model');

module.exports.createCar = async (req, res) => {
    const newCar = new carModel({
        owner: req.body.owner,
        plaque: req.body.plaque,
        marque: req.body.marque,
        modele: req.body.modele,
    });
    try {
        const car = await newCar.save();
        return res.status(201).json(car);
    } catch (err) {
        console.log(err)
        return res.status(201).json(err)   
    }  
};

module.exports.getCars = async (req,res) => {
    const cars = await carModel.find().sort({ createdAt: -1});;
    res.status(200).json(cars);
}


module.exports.getACar = async (req,res) => {
    const car = await carModel.find({plaque: req.params.plaque}).sort({ createdAt: -1});;
    res.status(200).json(car);
}

module.exports.getAllCarOfAPerson = async (req,res) => {
    const cars = await carModel.find({owner: req.params.id});;
    res.status(200).json(cars);
}


module.exports.updateCar = async (req, res) => {
    try {
        carModel.findOneAndUpdate(
            {plaque: req.params.plaque},
            {
                $set: req.body
            },
            { 
                new: true,
                upsert: true,
                setDefaultsOnInsert: true 
            },
            (err, docs) => {
                if(!err) return res.send(docs);
                if(err) return res.status(500);send({message : err});
            }
        )
    } catch (err) {
        return res.status(500).send({message : err});
    }
}