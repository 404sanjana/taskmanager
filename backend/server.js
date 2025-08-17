
// backend/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

/* ---- core middleware ---- */
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/* ---- routes ---- */
// import your routers (make sure each route file does: module.exports = router)
const transactionRoutes = require('./routes/transactionRoutes'); // adjust as needed
// const authRoutes = require('./routes/authRoutes');

app.use('/api/transactions', transactionRoutes);
// app.use('/api/auth', authRoutes);

/* ---- health check ---- */
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

/* ---- 404 + error handlers ---- */
app.use((req, res, _next) => res.status(404).json({ error: 'Not Found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

/* ---- export app for tests ---- */
module.exports = app;

/* ---- start server only outside tests ---- */
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}