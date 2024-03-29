const {config} = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI_DEV =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;//

const URI_PROD = config.databaseUrl;//  /${config.dbName}
//para las migraciones nos pide 2 ambientes que son el de dev y prod. Esta configuracion es para la migracion
//es para evitar usar el 'sync()' y empezar a usar las migraciones
module.exports = {
  development: {
    url: URI_DEV,
    dialect: 'postgres'
  },
  production: {
    url: URI_PROD,
    dialect: 'postgres'
  }
}
