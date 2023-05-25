const { Client } = require('pg');

//el getConnection nos devuelve el cliente es decir la base de datos
//en donde realizaremos las consultas con SQL que podemos utilizar en los servicios

//Este ejemplo crea cada vez una nueva conexion lo que no es adecuado
//ya que va creando varias instancias a medida que hacemos una consulta
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

