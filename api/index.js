const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const accidentRoutes = require('./routes/accident.routes');
const peopleRoutes = require('./routes/people.routes');
const hospitalRoutes = require('./routes/hospital.routes');
const policeRoutes = require('./routes/police.routes');
const insuranceRoutes = require('./routes/insurance.routes');
const carRoutes = require('./routes/car.routes');
require('dotenv').config({ path: './config/.env' })

const app = express();


//connection bdd
mongoose.connect("mongodb://nongo:27017/CRASH", (err) => {
    if (!err) console.log("connected to mongo");
    else console.log("not connected to mongo");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use('/api/accident', accidentRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/police', policeRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/car', carRoutes);



//server
app.listen("8001", () => {
    console.log(`Listening on port 8001`);
})