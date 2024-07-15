require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cron = require('node-cron')
const axios = require('axios')

const narcanRoutes = require('./routes/narcanRoutes')
const reductionRoutes = require('./routes/reductionRoutes')
const smsRoutes = require('./routes/smsRoutes')
const dummyRoutes = require('./routes/dummyRoutes')
const refillRoutes = require('./routes/refillRoutes')

//express app
const app = express()
app.use(cors())

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/narcan', narcanRoutes)
app.use('/api/otherforms', reductionRoutes)
app.use('/api/sms', smsRoutes)
app.use('/api/dummy', dummyRoutes)
app.use('/api/refill',refillRoutes)

app.get('/api/places', async (req, res) => {
    const { latitude, longitude } = req.query;
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
            params: {
                input: 'park',
                inputtype: 'textquery',
                locationbias: `circle:200@${latitude},${longitude}`,
                fields: 'formatted_address,name,geometry',
                key: process.env.REACT_APP_API
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/geocode', async (req, res) => {
    const { latitude, longitude } = req.query;
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                latlng: `${latitude},${longitude}`,
                key: process.env.REACT_APP_API
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//connect to db 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to db & listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// cron job to make an HTTP request every fifteen minutes
// cron.schedule('*/15 * * * *', () => {
//     console.log('Running a job every 15 minutes');
//     axios.get('https://prevent-overdose-github-io.onrender.com/api/dummy')  // Replace with your actual URL and endpoint
//         .then(response => {
//             console.log('HTTP request successful:', response.data);
//         })
//         .catch(error => {
//             console.log('Error making HTTP request:', error);
//         });
// });
