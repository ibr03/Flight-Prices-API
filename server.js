const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;
const API_HOST = process.env.API_HOST;

// check server running on port
app.get('/', (req, res) => {
  res.send('hello world');
})

// API route
// itineraryType, sortOrder, numAdults, numSeniors, classofService can be modified as per your requirements
app.get('/flights/:source/:destination/:date', async (req, res) => {
  const { source, destination, date } = req.params;
  const options = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
    params: {
      sourceAirportCode: source,
      destinationAirportCode: destination,
      date: date,
      itineraryType: 'ONE_WAY',
      sortOrder: 'PRICE',
      numAdults: '1',
      numSeniors: '0',
      classOfService: 'ECONOMY',
      pageNumber: '1',
      currencyCode: 'USD'
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data.data.flights[0].segments[0].legs);
    // response.data.data.flights[0].segments[0].legs is an array with {operatingCarrier.displayName}
    // response.data.data.flights[0].purchaseLinks is an array with {totalPrice}
    const flightData = response.data.data.flights;
    let prices = {};

    for (let i = 0; i < flightData.length; i++) {
      const airline = flightData[i].segments[0].legs[0].operatingCarrier.displayName;
      const price = flightData[i].purchaseLinks[0].totalPrice;
      prices[airline] = `$${price}`;
    }
    res.json(prices); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


app.listen(PORT);

console.log(`Server listening on http://localhost:${PORT}`);
