const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 5001;

const apiKey = '895284fb2d2c50a520ea537456963d9c'; // Replace with your OpenWeatherMap API key

app.use(express.json());

app.get('/api/weather/:location', (req, res) => {
  const { location } = req.params;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  axios
    .get(url)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Unable to fetch weather data' });
    });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

