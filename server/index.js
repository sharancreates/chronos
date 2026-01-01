require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const capsuleRoutes = require('./routes/Capsules');

const app = express()

app.use(express.json()); //parse json
app.use(cors()); //fwd to bcd

mongoose.connect(process.env.MONGO_URI).then(() => console.log('mongodb connected to chronos')).catch(err => console.error('mongodb error', err));

app.use('/api/capsules', capsuleRoutes);

app.get('/', (req, res) => {
    res.send('chronos api is running...') ;
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});