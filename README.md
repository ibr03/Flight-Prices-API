# Flight-Prices-API
Basic Node.js app to fetch flight prices using Express and Axios.

## Usage
* Register on https://rapidapi.com/hub
* Search for TripAdvisor API and select Flight Prices API to configure your 'X-RapidAPI-Key' and 'X-RapidAPI-Host
* Install dependencies
``` 
npm install

# Run in development
npm run server
```
## Example Usage
Go to http://localhost:5050/flights/DEL/BOM/2023-05-17 to get all flights from Delhi to Bombay for the date 17-05-2023, which returns data in the following form - 

``` 
{"Malaysia Airlines":"$473.14","SpiceJet":"$515.61","Gulf Air":"$631.47","Ethiopian":"$1180.04"}
```


