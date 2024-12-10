const AppError = require('../../utils/appError')
const { recordset } = require('../../utils/recordSet');
const dbConfig = require('../dbConfig');
const createDbConnect = require('../dbConnect');

class Afiliacioens {
    constructor(dni){
        this.pool = null;
        this.dni = dni
    }

    async inicializacion() {
        this.pool = await createDbConnect(dbConfig.afiliaciones)
    }
    
    oBeneficiario =  async ()=>{
    let queryStr =`
        SELECT TOP(1) 
            Titular_ID,
            ben_id,
            ben_ape as apellido, 
            ben_nom as nombre,
            cob_nro, 
            cob_ext, 
            Vigente, 
            "Plan" 
        from oBeneficiarios
        WHERE ben_doc_nro = '${this.dni}' 
        ORDER BY cob_ini_fecha DESC
        `

    try {
        const [afiliado] = recordset(await this.pool.query( queryStr ))

            if(!afiliado)
                { throw new AppError('No se encontró el numero de dni', true, 404) } 
            if( afiliado.Vigente !== 1 ) 
                { throw new AppError('No se encuentra vigente', true, 404) } 
            if(! this.cobertura(afiliado.Plan)) 
                { throw new AppError('Hubo un error, por favor comuníquese con afiliaciones', false, 500) } 
            
            return afiliado
    } catch (err) {
        throw new AppError('Hubo un error, por favor intente nuevamente mas tarde', false,500)
    }
    finally {
        this.pool.close()
    }
}

benId = async () => {

    await this.inicializacion()

    try {
        const [id] = recordset(await this.pool.query(`
            SELECT ben_id from oBeneficiarios
                where ben_doc_nro = '${this.dni}' 
                ORDER BY cob_ini_fecha DESC
            `))

            if(id)
                { return id.ben_id }
            else {
                throw new Error('Hubo un error en Argos')
            }
        } catch (err) {
            throw err
        } finally {
            this.pool.close()
        }
}

credencial = async ()=> {
    await this.inicializacion()

    try {
        const [afiliado] = recordset(await this.pool.query(`
            SELECT TOP(1) ben_ape as apellido, 
                ben_nom as nombre,
                cob_nro, 
                cob_ext, 
                Vigente, 
                "Plan" 
                    from oBeneficiarios
                    WHERE ben_id = ${this.dni} 
                    ORDER BY cob_ini_fecha DESC
            `))
         return afiliado 
    } catch(err) {
        console.log(err);
        throw new AppError('Hubo un error, por favor intente nuevamente mas tarde',500)
    } finally {
        this.pool.close()
    }

}

cobertura(plan){
    const planes = ['S100','S200','S300','S300J', 'S300E']
    return planes.includes(plan)
}
} 

module.exports = Afiliacioens