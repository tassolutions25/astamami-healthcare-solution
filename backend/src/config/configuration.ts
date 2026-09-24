export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/astamami_db',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'astamami_dev_access_secret_key_1234567890',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'astamami_dev_refresh_secret_key_1234567890',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  storage: {
    driver: process.env.STORAGE_DRIVER || 'local',
    localUploadPath: process.env.LOCAL_UPLOAD_PATH || './uploads',
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
});
