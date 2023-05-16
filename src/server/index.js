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
    'sortDirection': 'desc',
    'field': ['sentiment.title.polarity', 'sentiment.title.confidence']
  };

  apiInstance.listStories(opts, function (error, data, response) {
    if (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'An error occurred with the Aylien API request.' });
    } else {
      const stories = data.stories.map(story => {
        const { sentiment } = story;
        const polarity = sentiment?.title?.polarity || 'N/A';
        const confidence = sentiment?.title?.confidence || 'N/A';
        return {
          title: story.title,
          snippet: story.summary.sentences[0],
          sentiment: {
            polarity,
            confidence
          },
          links: story.links
        };
      });
      res.send(stories);
    }
  });
});
