const { Client } = require('pg');

async function getConnection(){
  try {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'imert',
      password: 'root',
      database: 'my_store'
    });
    await client.connect();

    return client;

  } catch (error) {
    console.log("este es el error"+error);
  }
}

module.exports = getConnection;

