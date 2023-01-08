const accidentModel = require('../models/accident.model');

module.exports.createAccident = async (req, res) => {
    const newAccident = new accidentModel({
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        vehicles: [],
        victims: [],
        injured: [],
    });
    try {
        const accident = await newAccident.save();
        return res.status(201).json(accident);
    } catch (err) {
        console.log(err)
        return res.status(201).json(err)   
    }  
};

module.exports.getAccidents = async (req,res) => {
    const accidents = await accidentModel.find().sort({ createdAt: -1});;
    res.status(200).json(accidents);
}

module.exports.getAccidentDate = async (req,res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const accidents = await accidentModel.find({
        createdAt: { $gte: date1, $lt: date2},
      }).sort({ createdAt: -1});
    res.status(200).json(accidents);
}

module.exports.getAccidentsOfNode = async (req,res) => {
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const accidents = await accidentModel.find({longitude: longitude, latitude: latitude}).sort({ createdAt: -1});;
    res.status(200).json(accidents);
}

module.exports.getAccidentsOfNodeByDate = async (req,res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    console.log({ startDate, endDate});

    const accidents = await accidentModel.find({longitude: longitude, latitude: latitude, createdAt: { $gte: startDate, $lt: endDate}}).sort({ createdAt: -1});;
    res.status(200).json(accidents);
}



module.exports.accidentData = (req,res) => {
    accidentModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Identifiant inconnu : ' + err);

    });
}


module.exports.updateAccident = async (req, res) => {
    try {
        accidentModel.findOneAndUpdate(
            {_id: req.params.id},
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



module.exports.getStats = async (req,res) => {
    const accidents = await accidentModel.find();
    let victims = 0;   // nombre victimes
    let injured = 0;   // nombre blesse
    let grave = 0;   // gravity -> moyenne 
    let dead = 0;      // gravity -> fatal

    let l=0
    let k=0
    accidents.forEach(element => {
        if (element.severity=="grave") {
            grave++
        }
        if (element.severity=="fatal") {
            dead++
        }
        
        l=element.victims.length
        if (l!=0) {
            victims=victims+l
        }

        k=element.injured.length
        if (k!=0) {
            injured=victims+k
        }
        
    });
    const stats = {
        "victimes":victims,
        "injured":injured,
        "grave": grave,
        "dead": dead,
        "total_accidents":accidents.length

    }
    res.status(200).json(stats);
}

module.exports.getStatsByDate = async (req,res) => {

    const startDate = req.body.date.start;
    const endDate = req.body.date.end;
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const accidents = await accidentModel.find({
        createdAt: { $gte: date1, $lt: date2},
      });

    let victims = 0;   // nombre victimes
    let injured = 0;   // nombre blesse
    let grave = 0;   // gravity -> moyenne 
    let dead = 0;      // gravity -> fatal

    let l=0
    let k=0
    accidents.forEach(element => {
        if (element.severity=="grave") {
            grave++
        }
        if (element.severity=="fatal") {
            dead++
        }
        
        l=element.victims.length
        if (l!=0) {
            victims=victims+l
        }

        k=element.injured.length
        if (k!=0) {
            injured=victims+k
        }
        
    });
    const stats = {
        "victimes":victims,
        "injured":injured,
        "grave": grave,
        "dead": dead,
        "total_accidents":accidents.length

    }
    res.status(200).json(stats);
}



module.exports.getStatsOfNode = async (req,res) => {
    const longitude = req.body.station.longitude;
    const latitude = req.body.station.latitude;
    const accidents = await accidentModel.find({longitude: longitude, latitude: latitude});

    let victims = 0;   // nombre victimes
    let injured = 0;   // nombre blesse
    let grave = 0;   // gravity -> moyenne 
    let dead = 0;      // gravity -> fatal

    let l=0
    let k=0
    accidents.forEach(element => {
        if (element.severity=="grave") {
            grave++
        }
        if (element.severity=="fatal") {
            dead++
        }
        
        l=element.victims.length
        if (l!=0) {
            victims=victims+l
        }

        k=element.injured.length
        if (k!=0) {
            injured=victims+k
        }
        
    });
    const stats = {
        "victimes":victims,
        "injured":injured,
        "grave": grave,
        "dead": dead,
        "total_accidents":accidents.length
    }
    res.status(200).json(stats);
}

module.exports.getStatsOfNodeByDate = async (req,res) => {


    const startDate = req.body.date.start;
    const endDate = req.body.date.end;
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const longitude = req.body.station.longitude;
    const latitude = req.body.station.latitude;
    const accidents = await accidentModel.find({
        longitude: longitude, 
        latitude: latitude,
        createdAt: { $gte: date1, $lt: date2},
    });

    let victims = 0;   // nombre victimes
    let injured = 0;   // nombre blesse
    let grave = 0;   // gravity -> moyenne 
    let dead = 0;      // gravity -> fatal

    let l=0
    let k=0
    accidents.forEach(element => {
        if (element.severity=="grave") {
            grave++
        }
        if (element.severity=="fatal") {
            dead++
        }
        
        l=element.victims.length
        if (l!=0) {
            victims=victims+l
        }

        k=element.injured.length
        if (k!=0) {
            injured=victims+k
        }
        
    });
    const stats = {
        "victimes":victims,
        "injured":injured,
        "grave": grave,
        "dead": dead,
        "total_accidents":accidents.length
    }
    res.status(200).json(stats);
}