const express = require('express');
const app = express();

// ... your middleware (cors, json, etc.)

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes); // do not call it like a function

module.exports = app; // export app for tests

// only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}
