const policeModel = require('../models/police.model');

module.exports.createPolice = async (req, res) => {
    const newPolice = new policeModel({
        name: req.body.name,
        phone: req.body.phone,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    });
    try {
        const police = await newPolice.save();
        return res.status(201).json(police);
    } catch (err) {
        console.log(err)
        return res.status(201).json(err)   
    }  
};

module.exports.getAllStations = async (req,res) => {
    const stations = await policeModel.find();
    res.status(200).json(stations);
}

module.exports.getStation = async (req,res) => {
    const stations = await policeModel.find();
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