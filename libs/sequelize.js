const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//const URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//const sequelize = new Sequelize(URI);

const sequelize = new Sequelize(config.dbName, USER, PASSWORD, {
  host: config.dbHost,
  port: config.dbPort,
  dialect: 'postgres'
});
setupModels(sequelize);
//coge los modelos y crea la estructura de la DB es decir crea las tablas y lo que esta configurado
//esto no se aconseja utilizar en produccion, se necesita un sistema de migraciones para saber en que punto esta

//sequelize.sync();

module.exports = sequelize;
