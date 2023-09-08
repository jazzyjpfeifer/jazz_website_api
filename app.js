const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const serverless = require('serverless-http');


if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(cors({
  origin: '*'
}));


//Routes
 const events = require('./routes/events');

app.use('/', events);
app.use('/.netlify/functions/server', events);  // path must route to lambda


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
module.exports.handler = serverless(app);