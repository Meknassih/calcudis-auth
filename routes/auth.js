var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res, next) {
  console.log('>>BODY:', req.body);
  console.log('>>USER:', req.body.user);
  res.send('respond with a resource');
});

module.exports = router;
