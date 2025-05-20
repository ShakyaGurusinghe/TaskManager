export const config = {
    dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager',
    port: process.env.PORT || 5001,
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret'
  };