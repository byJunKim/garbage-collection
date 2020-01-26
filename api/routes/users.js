const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('****************************************body', req.body)
  res.send('respond with a resource');
});

module.exports = router;
