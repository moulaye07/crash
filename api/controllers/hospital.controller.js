const hospitalModel = require('../models/hospital.model');

module.exports.createHosptal = async (req, res) => {
    const newHospital = new hospitalModel({
        name: req.body.name,
        phone: req.body.phone,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    });
    try {
        const hospital = await newHospital.save();
        return res.status(201).json(hospital);
    } catch (err) {
        console.log(err)
        return res.status(201).json(err)   
    }  
};

module.exports.getAllStations = async (req,res) => {
    const stations = await hospitalModel.find();
    res.status(200).json(stations);
}

module.exports.getStation = async (req,res) => {
    const stations = await hospitalModel.find();
    var minDif = 99999;
    var closest;
    var station = {};
    const latitude = req.body.latitude
    const longitude = req.body.longitude

    for (var i = 0; i < stations.length; ++i) {
        var dif = Math.pow(stations[i].latitude - latitude, 2) + Math.pow(stations[i].longitude - longitude, 2);
        var diff = Math.sqrt(dif);
        if (diff < minDif) {
            closest = i;
            minDif = diff;
            station = stations[closest]
        }
    }
    
    res.status(200).json(station);
}