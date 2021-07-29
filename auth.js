const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // check for the token
  if (!token) {
    return res.status(401).json({ msg: 'No token, unlucky boet' });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    // gooi user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not lekker' });
  }
}

module.exports = auth;
