const { recordset } = require('../../utils/recordSet')
const dbConfig = require('../dbConfig')
const createDbConnect = require('../dbConnect')

class Localidad {
    constructor(region) {
        this.pool = null 
        this.region = region 
    }

 inicializacion = async () => {
    this.pool = await createDbConnect(dbConfig.localidades)
 }    
    
getRegion = async () => {
    const region = recordset( await pool.query(`
    SELECT * FROM region
    `))    
    return region
}
getZona = async () => {
    const zona = recordset( await pool.query(`
    select P.idProvincia as id, P.provincia from region_provincia RP
    inner join provincia P
    ON RP.idProvincia = P.idProvincia
    where RP.idRegion = '${this.region}'
    `))    
    return zona
}
getLocalidad = async () => {
    console.log(this.region)
    const [localidad] = recordset( await pool.query(`
    SELECT localidad FROM localidades where idLocalidad = ${this.region}
    `).catch(err=>{console.log(err)}))
    console.log(localidad)
    return localidad
}
}

module.exports = Localidad