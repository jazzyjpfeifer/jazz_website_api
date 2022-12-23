const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;


//Routes
app.get('/', (req, res) => res.type('html').send(html));
app.get('/api/events', cors(), (req, res) => {
  res.send('events')
})

app.get('/api/customers', cors(), (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));