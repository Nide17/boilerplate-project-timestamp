// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


// API to get the date and convert into unix and utc
app.get("/api/:stringDate?", function (req, res) {

  var stringDate = req.params.stringDate;
  var date;

  if (stringDate == undefined) {
    // Use the default today date
    date = new Date();
  }

  else {
    if (isNaN(stringDate)) {
      date = new Date(stringDate);
    } else {
      date = new Date(parseInt(stringDate));
    }
  }

  // If it cannot be parsed, return an error
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  // Else return the unix and utc
  else {
    var unix = date.getTime();
    var utc = date.toUTCString();
    res.json({ unix, utc });
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
