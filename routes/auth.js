const sqlite = require('sqlite');
const express = require('express');
const router = express.Router();
const openDb = sqlite.open('./data.db', { Promise });

router.post('/login', async function (req, res, next) {
  console.log('>>BODY:', req.body);

  try {
    const db = await openDb;
    console.log('Sucessfully connected to DB');
    const row = await db.get('SELECT * FROM user WHERE username = ? AND password = ?',
      [req.body.username, req.body.password]);
    res.setHeader('Content-type', 'application/json');
    if (row) {
      res.status(200);
      res.send(JSON.stringify(row));
    } else {
      res.status(400);
      res.send(JSON.stringify({ message: "Bad username/password combination." }));
    }
  } catch (err) {
    res.status(500);
    res.send('Internal server error.');
  }
});

module.exports = router;
