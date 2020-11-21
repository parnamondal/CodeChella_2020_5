const express = require('./config/express.js')
 
// Use env port or default
const port = process.env.PORT || 5000;
const app = express.init()
require("dotenv").config();
app.use('/twitter',require("./routes/twitterAPI"))
app.listen(port, () => console.log(`Server now running on port ${port}!`));

