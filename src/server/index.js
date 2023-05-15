var path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const AylienNewsApi = require("aylien-news-api");

// Load environment variables from .env file
require('dotenv').config();

const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('News Stories app listening on port 8081!')
})

app.get('/aylien', async function (req, res) {
    const city = req.query.city; // Get the city from the query parameters

    const defaultClient = AylienNewsApi.ApiClient.instance;

    const app_id = defaultClient.authentications['app_id'];
    app_id.apiKey = process.env.AYLIEN_APP_ID;
    const app_key = defaultClient.authentications['app_key'];
    app_key.apiKey = process.env.AYLIEN_APP_KEY;

    const apiInstance = new AylienNewsApi.DefaultApi();

    let currentDate = new Date();
    let pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 7);
    
    const opts = {
        'sourceScopesCity': [city],
        'publishedAtStart': pastDate.toISOString(),
        'publishedAtEnd': currentDate.toISOString(),
        'language': ['en'],
        'perPage': 10,
        'sortDirection': 'desc'
    };
    

    apiInstance.listStories(opts, function(error, data, response) {
        if (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'An error occurred with the Aylien API request.' });
        } else {
            res.send(data.stories);
        }
    });
});



// var path = require('path')
// const express = require('express')
// const mockAPIResponse = require('./mockAPI.js')
// const fetch = require('node-fetch');

// // Load environment variables from .env file
// require('dotenv').config();
// require('@babel/register')({
//     presets: ['@babel/preset-env']
// });

// const app = express()

// // Middleware to parse JSON bodies
// app.use(express.json());

// app.use(express.static('dist'))

// console.log(__dirname)

// app.get('/', function (req, res) {
//     res.sendFile('dist/index.html')
// })

// // designates what port the app will listen to for incoming requests
// app.listen(8081, function () {
//     console.log('Example app listening on port 8081!')
// })

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

// New endpoint to handle Aylien API calls
// app.post('/aylien', async function (req, res) {
//     console.log(req.body); // logging request body
//     let url = `https://api.aylien.com/api/v1/analyze?url=${req.body.url}&lang=en`;

//     try {
//         let response = await fetch(url, {
//             headers: {
//                 'X-AYLIEN-TextAPI-Application-Key': process.env.AYLIEN_APP_KEY,
//                 'X-AYLIEN-TextAPI-Application-ID': process.env.AYLIEN_APP_ID
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         let data = await response.json();
//         res.send(data);
//     } catch (error) {
//         console.error('Error:', error); // logging error
//         res.status(500).send({ error: 'An error occurred with the Aylien API request.' });
//     }
// });

// New endpoint to handle Aylien API calls
// app.post('/aylien', async function (req, res) {
//     // Note: The Aylien News API expects parameters to be passed as query strings
//     let url = `https://api.aylien.com/news/stories?language[]=en&source.scopes.city[]=Calgary`;

//     try {
//         let response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'X-AYLIEN-NewsAPI-Application-ID': process.env.AYLIEN_APP_ID,
//                 'X-AYLIEN-NewsAPI-Application-Key': process.env.AYLIEN_APP_KEY
//             }
//         });

//         if (response.ok) { 
//             let data = await response.json();
//             res.send(data);
//         } else {
//             throw new Error('Response Error: '+ response.statusText);
//         }
//     } catch (error) {
//         res.send({ error: "An error occurred with the Aylien API request: " + error.message });
//     }
// });

// New endpoint to handle Aylien API calls
// app.post('/aylien', async function (req, res) {
//     // Extract the city from the client request
//     let city = req.body.url;

//     // Construct the Aylien API URL with the city
//     let url = `https://api.aylien.com/news/stories?language[]=en&source.scopes.city[]=${city}`;

//     try {
//         let response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'X-AYLIEN-NewsAPI-Application-ID': process.env.AYLIEN_APP_ID,
//                 'X-AYLIEN-NewsAPI-Application-Key': process.env.AYLIEN_APP_KEY
//             }
//         });

//         if (response.ok) { 
//             let data = await response.json();
//             res.send(data);
//         } else {
//             throw new Error('Response Error: '+ response.statusText);
//         }
//     } catch (error) {
//         res.send({ error: "An error occurred with the Aylien API request: " + error.message });
//     }
// });
