const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  GMAIL_PASS: process.env.GMAIL_PASSWORD,
  GMAIL_EMAIL: process.env.GMAIL_EMAIL
};
