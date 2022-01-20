const express = require('express');
const db = require('./config/connection');

const { User } = require('./models');

const app = express();
const port = 3001;

db.once('open', () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}`);
  });
});

app.use(express.json());
