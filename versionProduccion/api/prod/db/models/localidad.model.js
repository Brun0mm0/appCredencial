const db = require('../dbLocalidad')
const { recordset } = require('../../utils/recordSet')
const qry = db.request()

class Localidad {
    constructor(region) { this.region = region }
    
getRegion = async () => {
    const region = recordset( await qry.query(`
    SELECT * FROM region
    `))    
    return region
}
getZona = async () => {
    const zona = recordset( await qry.query(`
    select P.idProvincia as id, P.provincia from region_provincia RP
    inner join provincia P
    ON RP.idProvincia = P.idProvincia
    where RP.idRegion = '${this.region}'
    `))    
    return zona
}
getLocalidad = async () => {
    console.log(this.region)
    const [localidad] = recordset( await qry.query(`
    SELECT localidad FROM localidades where idLocalidad = ${this.region}
    `).catch(err=>{console.log(err)}))
    console.log(localidad)
    return localidad
}
}

module.exports = Localidad