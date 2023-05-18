const { Pool } = require('pg');
const {config} = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//El URI en entorno de produccion solamente es el enlace que te
//proporcionan los diferentes companias de servidores como AWS, OCEAN etc.
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({
  connectionString: URI
});
/*
// Esta forma de conectar es insegura pero funcional
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'imert',
  password: 'root',
  database: 'my_store'
});
*/
module.exports = pool;

