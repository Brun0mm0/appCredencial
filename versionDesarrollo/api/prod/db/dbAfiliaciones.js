const sql = require('mssql');

 const dbAfiliaciones = {
     "user": "sa",
     "password": "Maraton25",
     "server": "130.130.205.30",
     "port": 1433,
     "database": "Argos",
     "options": {
         "instanceName": "SQL2008",
         "encrypt": false,
         "enableArithAbort": false
     }
 };
//const dbAfiliaciones = {
//    "user": "sa",
//    "password": "Peloponeso123",
//    "server": "130.130.205.40",
//    "port": 49411,
//    "database": "saab",
//    "options": {
//        "instanceName": "SQL2008",
//        "encrypt": false,
//        "enableArithAbort": false
//    }
//};

const poolAfiliaciones = new sql.ConnectionPool(dbAfiliaciones);
const poolAfiliacionesConnect = poolAfiliaciones.connect().then(()=>{
    console.log('dbAfiliaciones Connect');
})

module.exports = poolAfiliaciones;