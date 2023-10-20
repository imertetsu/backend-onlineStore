const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index');

//aseguras de que cualquier carácter especial en ese valor sea codificado correctamente antes de ser utilizado en una URL.
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//const URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//const sequelize = new Sequelize(URI);

/*const sequelize = new Sequelize(config.dbName, USER, PASSWORD, {
  host: config.dbHost,
  port: config.dbPort,
  dialect: 'postgres'
});*/
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});
setupModels(sequelize);
//coge los modelos y crea la estructura de la DB es decir crea las tablas y lo que esta configurado
//esto no se aconseja utilizar en produccion, se necesita un sistema de migraciones para saber en que punto esta

//sequelize.sync();

module.exports = sequelize;
