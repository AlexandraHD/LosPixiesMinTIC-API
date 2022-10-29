const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',

  DATABASE_URI: process.env.MONGO_URI,
};

module.exports = config;
