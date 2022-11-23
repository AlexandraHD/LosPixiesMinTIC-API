const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',

  DATABASE_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT: process.env.CLIENT,
};

module.exports = config;