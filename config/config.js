//esto por defecto hace que lea el archivo .env
require('dotenv').config();

//para la seguridad de los datos se declaran variables de entorno y
//utilizarlas en el archivo .env
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  signature: process.env.SIGNATURE
}

module.exports = { config };
