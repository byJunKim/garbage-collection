const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  console.log('****************************************body', req.body)
  res.send('respond with a resource');
});

module.exports = router;
