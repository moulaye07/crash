const peopleModel = require('../models/people.model');
const insuranceModel = require('../models/insurance.model');

//inscription
module.exports.addPeople = async (req, res) => {
    //const {name, cin, address, relatives, phone, email, insurance} = req.body
    try {
        //const people = await peopleModel.create({name, cin, address, relatives, phone, email, insurance});
        const people = await peopleModel.create(req.body);
        res.status(201).json({ people : people});
    }
    catch(err) {
        res.status(200).send({errors})
    }
}


module.exports.getPeople = async (req,res) => {
    const people = await peopleModel.find();
    res.status(200).json(people);
}

module.exports.peopleData = (req,res) => {
    peopleModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Identifiant inconnu : ' + err);
    });
}
module.exports.peopleDataAndInsurance = async (req,res) => {
    const person = await peopleModel.find({_id: req.params.id});
    const insurance = await insuranceModel.find({_id: person[0].insurance})
    res.send({"person":person[0], "insurance":insurance[0]});
}

module.exports.peopleInsurance = async (req,res) => {
    const person = await peopleModel.find({_id: req.params.id});
    const insurance = await insuranceModel.find({_id: person[0].insurance})
    res.send({"insurance": insurance[0]});
}

module.exports.peopleDataAndRelatives = async (req,res) => {
    try {
        const person = await peopleModel.find({_id: req.params.id});
        const relatives = await peopleModel.find({_id: {$in: person[0].relatives}})
        return res.send({"person":person[0], "relatives": relatives});
    } catch (err) {
        return res.status(201).json(err)   
    }  
}

module.exports.peopleRelatives = async (req,res) => {
    try {
        const person = await peopleModel.find({_id: req.params.id});
        const relatives = await peopleModel.find({_id: {$in: person[0].relatives}})
        return res.send({"relatives": relatives});
    } catch (err) {
        return res.status(201).json(err)   
    }  
}

module.exports.updatePeopleData = async (req, res) => {
    try {
        peopleModel.findOneAndUpdate(
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