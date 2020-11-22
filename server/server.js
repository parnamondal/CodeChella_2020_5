const express = require('./config/express.js')
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const { model } = require('mongoose');
// Use env port or default
// const port = process.env.PORT || 5000;
const app = express.init()
require("dotenv").config();
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
app.use(bodyParser.json());
app.use('/twitter',require("./routes/twitterAPI"))
// app.listen(port, () => console.log(`Server now running on port ${port}!`));

module.exports = app;
