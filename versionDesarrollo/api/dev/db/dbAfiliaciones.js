const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config({path:'../../server.js'});

 const dbAfiliaciones = {
     "user": "sad",
     "password": `${process.env.DB_PASS_DEV}`,
     "server": `${process.env.DB_SERVER_DEV}`,
     "port": `${process.env.DB_PORT_DEV}`,
     "database": `${process.env.DB_DEV}`,
     "options": {
         "instanceName": "SQL2008",
         "encrypt": false,
         "enableArithAbort": false
     }
 };

const poolAfiliaciones = new sql.ConnectionPool(dbAfiliaciones);
const createConnectionPool = async () => {
    let retries = 3;
  
    while (retries > 0) {
      try {
        await poolAfiliaciones.connect();
        console.log('Afiliaciones');
        return poolAfiliaciones;
      } catch (error) {
        console.error(`Error en la conexión: ${error.message}`);
        retries--;
  
        if (retries > 0) {
          console.log(`Reintentando conexión en 5 segundos...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
        } else {
          console.error(`No se pudo conectar después de 3 intentos.`);
          throw error;
        }
      }
    }
  };
  
  module.exports = createConnectionPool;