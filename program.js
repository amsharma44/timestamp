// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

app.get('/:date', function(req, res) {
  console.log(req.params.date);
  if(String(new Date(Number(req.params.date)*1000)) != 'Invalid Date') {
    try{
      var date = new Date(Number(req.params.date)*1000);
      console.log(date);
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      res.send(JSON.stringify({unix: req.params.date, natural: monthNames[monthIndex] + ' ' + day + ', '+ year}));
    } catch(err) {
      console.log(err);
      res.send(JSON.stringify({unix: null, natural: null}))
    }
  } else if(String(new Date(req.params.date)) != 'Invalid Date') {
    try {
      var date = new Date(req.params.date);
      res.send(JSON.stringify({unix: Date.parse(date)/1000, natural: req.params.date}));
    } catch(err) {
      console.log(err);
      res.send(JSON.stringify({unix: null, natural: null}));
    }
  } else {
    res.send(JSON.stringify({unix: null, natural: null}));
  }
});
app.get('/', function(req, res){
  res.send(JSON.stringify({unix: null, natural: null}));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
