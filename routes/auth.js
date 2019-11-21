const sqlite = require('sqlite');
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const utility = require('../utility');
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
        const privateKey = fs.readFileSync('private.pem');
        token = jwt.sign(
          {
            name: row.username,
            email: row.email,
            type: row.type
          },
          {
            key: privateKey,
            passphrase: '1234'
          },
          {
            algorithm: 'RS256',
            issuer: 'monsieurleserveurdauthentification',
            audience: row.type,
            expiresIn: '1d'
          });
      } catch (e) {
        console.error(e);
        res.status(500);
        return res.send(JSON.stringify({ message: 'Internal error while signing the token.' }));
      }
      res.status(200);
      return res.send(JSON.stringify({ token }));
    } else {
      res.status(400);
      return res.send(JSON.stringify({ message: 'Bad username/password combination.' }));
    }
  } catch (err) {
    res.status(500);
    res.send('Internal server error.');
  }
});

router.get('/publickey', function (req, res, next) {
  res.setHeader('Content-type', 'application/json');
  const public = utility.strip(fs.readFileSync('public.pem').toString('UTF-8'));
  if (public && public.length > 0) {
    res.status(200);
    res.send(JSON.stringify({ key: public.toString('UTF8') }));
  } else {
    res.status(500);
    res.send(JSON.stringify({ message: 'Internal error while retrieving key.' }))
  }
});

module.exports = router;
