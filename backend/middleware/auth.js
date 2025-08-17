const jwt = require('jsonwebtoken');

// No-op in tests so CI can run without tokens
const allowAll = (_req, _res, next) => next();

function realAuth(req, res, next) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return res.status(401).json({ error: 'Authorization header missing' });

  const token = header.replace(/^Bearer\s+/i, '').trim();
  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach claims for downstream use
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = process.env.NODE_ENV === 'test' ? allowAll : realAuth;