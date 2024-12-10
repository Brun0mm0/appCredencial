const sql = require('mssql');

const db = {
     "user": "sa",
     "password": "Maraton25",
     "server": "130.130.205.30",
     "port": 1433,
     "database": "CartillaS300Copy",
     "options": {
         "instanceName": "SQL2008",
         "encrypt": false,
         "enableArithAbort": false
     }
 };
//const db = {
//   "user": "sa",
//   "password": "Peloponeso123",
//   "server": "130.130.205.40",
//   "port": 49411,
//    "database": "CartillaS300Copy",
//    "options": {
//        "instanceName": "SQL2008",
//        "encrypt": false,
//        "enableArithAbort": false
//    }
//};

const pool = new sql.ConnectionPool(db);
const poolConn = pool.connect().then(()=> {
    console.log('dbCartilla s300');
})

 .catch(
     (err)=>console.log(err)
 )

module.exports = pool;