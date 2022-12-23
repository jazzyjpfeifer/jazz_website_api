const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


//Routes
 const events = require('./routes/events');


app.get('/api/customers', cors(), (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.use('/', events);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));