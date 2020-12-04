/*jshint esversion: 6 */

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  console.log(req.body.cityName);

  const city = req.body.cityName;
  const apiKey = secrets.API_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + apiKey;

  https.get(url, function(response){

    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const sunrise = weatherData.sys.sunrise;
      const temp = weatherData.main.temp;
      const city = weatherData.name;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      var srDate = new Date(null);
      srDate.setTime(sunrise*1000);
      var date = srDate.toString();

      res.write("<p>The current weather in " + city + " is " + desc + ".</p>");
      res.write("<h1>The temperature in " + city + " is " +
        temp + " deg celsius.</h1>");
      res.write("Sunrise is " + date);
      res.write("<img src="+ imgURL + ">");
      res.send();
    });

  });

});

console.log(process.env);

port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server is running on port ", port);
});
