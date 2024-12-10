const sql = require('mssql');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV)        
    dotenv.config({ path: '.env.production' });
    } else {
        dotenv.config({ path: '.env' });
        }

const db = {
     "user": "sa",
     "password": `${process.env.DB_PASS}`,
            "server": `${process.env.DB_SERVER}`,
            "port": process.env.DB_PORT,
     "database": "CartillaS300Copy",
     "options": {
         "instanceName": "SQL2008",
         "encrypt": false,
         "enableArithAbort": false
     }
 };


 const poolS300 = new sql.ConnectionPool(db);
 const createS300Connect = async () => {
     let retries = 3
     while(retries > 0) {
         try {
             await poolS300.connect();
             return poolS300;
         } catch(err) {
             console.log(err);
             retries --;
 
             if(retries>0) {
                 console.log(`Reintenando conexión`);
                 await new Promise(resolve=>setTimeout(resolve, 500));
             } else {
                 console.log(`No se pudo conectar`)
                 throw err;
             }
         }
     }
 }
 
 module.exports = createS300Connect;
