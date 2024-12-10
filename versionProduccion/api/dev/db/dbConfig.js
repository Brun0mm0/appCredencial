const dotenv = require('dotenv');

if(process.env.NODE_ENV === 'production') {
    dotenv.config({path: '.env.production'})
} else {
    dotenv.config({path: '.env'})
}

const dbConfig = {
    afiliaciones: {
        "user": "sa",
            "password": `${process.env.DB_PASS}`,
            "server": `${process.env.DB_SERVER}`,
            "port": parseInt(process.env.DB_PORT,10),
            "database": "saab",
            "options": {
                "instanceName": "SQL2008",
                "encrypt": false,
                "enableArithAbort": false
                }
    },
    usuarios: {
        "user": "sa",
            "password": `${process.env.DB_PASS}`,
            "server": `${process.env.DB_SERVER}`,
            "port": parseInt(process.env.DB_PORT,10),
            "database": "Portal_Osssb",
            "options": {
                "instanceName": "SQL2008",
                "encrypt": false,
                "enableArithAbort": false
                }
    },
    cartillas: {
        s300: {
            "user": "sa",
                "password": `${process.env.DB_PASS}`,
                "server": `${process.env.DB_SERVER}`,
                "port": parseInt(process.env.DB_PORT,10),
                "database": "CartillaS300Copy",
                "options": {
                    "instanceName": "SQL2008",
                    "encrypt": false,
                    "enableArithAbort": false
                    }
        },
        s200: {
            "user": "sa",
                "password": `${process.env.DB_PASS}`,
                "server": `${process.env.DB_SERVER}`,
                "port": parseInt(process.env.DB_PORT,10),
                "database": "CartillaS300Copy",
                "options": {
                    "instanceName": "SQL2008",
                    "encrypt": false,
                    "enableArithAbort": false
                    }
        }
    },
    localidades: {
        "user": "sa",
                "password": `${process.env.DB_PASS}`,
                "server": `${process.env.DB_SERVER}`,
                "port": parseInt(process.env.DB_PORT,10),
                "database": "localidad",
                "options": {
                    "instanceName": "SQL2008",
                    "encrypt": false,
                    "enableArithAbort": false
                    }
    }
    

}

module.exports = dbConfig;