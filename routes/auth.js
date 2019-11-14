const sqlite = require('sqlite');
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const router = express.Router();
const openDb = sqlite.open('./data.db', { Promise });

router.post('/login', async function (req, res, next) {
  try {
    const db = await openDb;
    const row = await db.get('SELECT * FROM user WHERE username = ? AND password = ?',
      [req.body.username, req.body.password]);
    console.log(row);
    res.setHeader('Content-type', 'application/json');
    if (row) {
      let token = 'ERROR';
      try {
        const privateKey = fs.readFileSync('id_rsa.key');
        token = jwt.sign(
          {
            name: row.username,
            email: row.email,
            type: row.type
          },
          privateKey,
          {
            algorithm: 'HS256',
            issuer: 'monsieurleserveurdauthentification',
            audience: row.type,
            expiresIn: '1d'
          });
      } catch (e) {
        console.error(e);
        res.status(500);
        res.send(JSON.stringify({ message: 'Internal error while signing the token.' }));
      }
      res.status(200);
      res.send(JSON.stringify({ token }));
    } else {
      res.status(400);
      res.send(JSON.stringify({ message: 'Bad username/password combination.' }));
    }
  } catch (err) {
    res.status(500);
    res.send('Internal server error.');
  }
});

router.get('/publickey', function (req, res, next) {
  res.setHeader('Content-type', 'application/json');
  const public = fs.readFileSync('id_rsa.pub.key');
  if (public && public.length > 0) {
    res.status(200);
    res.send(JSON.stringify({ key: public.toString('UTF8') }));
  } else {
    res.status(500);
    res.send(JSON.stringify({ message: 'Internal error while retrieving key.' }))
  }
});

module.exports = router;
