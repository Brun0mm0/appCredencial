const db = require('../dbCartilla')
const dbS200 = require('../dbs200')
const { recordset } = require('../../utils/recordSet')
const req = db.request()
const s200 = dbS200.request()

class Cartilla {
    constructor() {}
getAtencion = async () => {
    const atencion = recordset(await req.query(`
    SELECT * FROM atencion order by atencion ASC 
    `))
    return atencion
}
getEspecialidad = async (id,plan,zona) => {
    if ((plan === 'S300J' || plan === 'S300E') && zona < 5 && id != 10 ) {
        const especialidad = recordset(await req.query(`
        SP_Especialidad ${id};
        `))
        return especialidad
    } else {
        const especialidad = recordset(await s200.query(`
        SP_Especialidad ${id};
        `))
        return especialidad

    }
}
getCartilla = async (plan,provincia,atencion,especialidad) => {
    
    if((plan == 'S300J' || plan == 'S300E') && provincia < 5 && atencion > 10) {
        console.log(plan, provincia)
        const cartilla = recordset( await req.query(`
        EXEC SP_Cartilla ${provincia},${atencion},${especialidad}
        `).catch(res=>{console.log(res)}))
        return cartilla
    } else {
        console.log(plan, provincia)
        const cartilla = recordset( await s200.query(`
        EXEC SP_Cartilla ${provincia},${atencion},${especialidad}
        `).catch(res=>{console.log(res)}))
        return cartilla
    }

}
getDirecciones = async (id) => {
    const cartilla = recordset( await req.query(`
        SELECT * FROM Direccion where id_direccion = ${id}
    `).catch(err=>{throw err}))
    return cartilla
}
}

module.exports = Cartilla