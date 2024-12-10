const db = require('../dbAfiliaciones')
const AppError = require('../../utils/appError')
const { recordset } = require('../../utils/recordSet')

class Afiliacioens {
    constructor(dni){
        this.dni = dni
        this.pool = null
    }
    
async inicializacion() {
    this.pool = await db();
}

oBeneficiario =  async ()=>{
    if(!this.pool) {
        throw new Error('error oBeneficiarios')
    }

    try{

        const argos = this.pool.request()
        
        const [afiliado] = recordset(await argos.query(`
        SELECT TOP(1) Titular_ID,ben_id,ben_ape as apellido, ben_nom as nombre,
        cob_nro, cob_ext, Vigente, "Plan" from oBeneficiarios
        WHERE ben_doc_nro = ${this.dni} ORDER BY cob_ini_fecha DESC
        `).catch(err=> { throw new AppError('Hubo un error, por favor intente nuevamente mas tarde',500) }))
        
        if(!afiliado) { 
            throw new AppError('dniNotFound',404) 
        } 
        else if( afiliado.Vigente !== 1 ) { 
            throw new AppError('dniNotVigente',404) 
        } 
        else if(! this.cobertura(afiliado.Plan)) { 
            throw new AppError('planNoAdm',500) 
        } 
        else { 
            return afiliado }
    } finally {
        // Cierra la conexión después de ejecutar la consulta
      this.pool.close();
    }
    
}
    
benId = async () => {
    const argos = db.request()
    const [id] = recordset(await argos.query(`
    SELECT ben_id from oBeneficiarios
    where ben_doc_nro = ${this.dni} ORDER BY cob_ini_fecha DESC
    `).catch(err=>{throw err}))
    // console.log(id)
    if(id){ return id.ben_id }
}

credecnail = async ()=> {
    const argos = db.request()

    const [afiliado] = recordset(await argos.query(`
        SELECT TOP(1) ben_ape as apellido, ben_nom as nombre,
        cob_nro, cob_ext, Vigente, "Plan" from oBeneficiarios
        WHERE ben_id = ${this.dni} ORDER BY cob_ini_fecha DESC
    `).catch(err=> { console.log(err);throw new AppError('Hubo un error, por favor intente nuevamente mas tarde',500) }))

    if(afiliado) { return afiliado }
}

cobertura(plan){
    const planes = ['S100','S200','S300','S300J', 'S300E']
    return planes.includes(plan)
}
} 

module.exports = Afiliacioens