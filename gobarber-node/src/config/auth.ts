export default {
  jwt: {
    secret: process.env.APP_SECRET || 'defauldt',
    expiresIn: '1d',
  },
};
