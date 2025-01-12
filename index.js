// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const respondSuccess = (myInput, res) => {
  const date = myInput != null ? new Date(myInput) : new Date();

  const unixMilliseconds = date.getTime();
  const utcDateString = date.toUTCString();

  res.json({
    unix: unixMilliseconds,
    utc: utcDateString,
  });
};

app.get("/api/:date", (req, res) => {
  const checkIfStringCanBeConvertedToNumber = (str) => {
    return !isNaN(Number(str));
  };

  const checkIfStringCanBeConvertedToDate = (str) => {
    return !isNaN(new Date(str));
  };

  const respondError = () => {
    res.json({
      error: "Invalid Date",
    });
  };

  const inputDateString = req.params.date;

  const isNumber = checkIfStringCanBeConvertedToNumber(inputDateString);

  // incase input is unix number
  if (isNumber) return respondSuccess(parseInt(inputDateString), res);

  const isValidDate = checkIfStringCanBeConvertedToDate(inputDateString);

  // incase input is valid date string
  if (isValidDate) return respondSuccess(inputDateString, res);

  // incase invalid input
  return respondError();
});

app.get("/api", (req, res) => {
  return respondSuccess(null, res);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
