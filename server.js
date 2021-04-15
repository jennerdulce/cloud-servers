'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}));
app.use(express.json());
let data = {};

app.get('/', (req, res) => {
  res.status(200).send('ONE MORE TIME')
})

app.post('/data', (req, res) => {
  data = req.body;
  res.status(200).send(data)
})

app.listen(PORT, () => {
  console.log(`Connected to PORT: ${PORT}`)
})