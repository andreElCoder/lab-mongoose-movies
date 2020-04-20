const express = require('express');
const routers  = express.Router();

/* GET celebrities */
routers.get('/celebrities', (req, res, next) => {
  res.render('celebrities');
});

module.exports = routers;
