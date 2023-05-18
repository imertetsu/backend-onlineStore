const { Sequelize } = require('sequelize');
const {config} = require('../config/config');
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
//coge los modelos y crea la estructura
sequelize.sync();

module.exports = sequelize;
