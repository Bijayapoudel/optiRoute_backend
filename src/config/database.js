require('dotenv').config();

export default {
  client: process.env.DB_CLIENT || 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root123',
    database: process.env.DB_NAME || 'optiroute',
    ssl:{
      rejectUnauthorized: false,
    },
    charset: 'utf8',
    socketPath: process.env.SOCKET_PATH,
  },
  migrations: {
    tableName: 'migrations',
    directory: process.cwd() + '/src/migrations',
  },
  seeds: {
    directory: process.cwd() + '/src/seeds',
  },
  debug: true,
};
