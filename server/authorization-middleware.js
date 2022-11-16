const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const token = req.header('X-Access-Token');
  if (token === undefined) {
    throw new ClientError(401, 'authentication required');
  }

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorizationMiddleware;
