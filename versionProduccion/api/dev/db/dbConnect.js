const sql = require('mssql');

const createDbConnect = async (dbConfig) => {
    const pool = new sql.ConnectionPool(dbConfig);
    let retries = 3; 
    while(retries > 0) {
        try {
            await pool.connect();
            return pool;
        }
        catch (err) {
            console.log(err);
            retries--;

            if( retries > 0) {
                console.log('Re intentando conexión')
                await new Promise(resolve=>setTimeout(resolve, 500));
            } else {
                console.log('No se pudo conectar');
                throw err
            }
        }
    }
}

module.exports = createDbConnect;