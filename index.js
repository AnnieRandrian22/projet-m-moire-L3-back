//importation route
const appareilRoute = require('./routes/appareil');
const sortieRoute = require('./routes/sortie');
const retourRoute = require('./routes/retour');
const userRoute = require('./routes/user');
const statistiqueRoute = require('./routes/statistique');
const demandeRoute = require('./routes/demande');
const tarifRoute = require('./routes/tarif');


const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/appareil', appareilRoute);
app.use('/api/sortie', sortieRoute);
app.use('/api/retour', retourRoute);
app.use('/api/user', userRoute);
app.use('/api/statistique', statistiqueRoute);
app.use('/api/demande', demandeRoute);
app.use('/api/tarif', tarifRoute);

module.exports = app;