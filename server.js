const path = require('path');
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const port = 3001;

app.use(express.json(), express.urlencoded({ extended: true }), routes);

db.once('open', () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}`);
  });
});

app.use((err, req, res, next) => {
  console.log(err.statusCode, err.message);
  res.status(err.statusCode || 500).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message,
  });
});
