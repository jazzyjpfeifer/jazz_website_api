const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(cors({
  origin: '*'
}));


//Routes
 const events = require('./routes/events');

app.use('/', events);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));