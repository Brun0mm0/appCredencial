const Afiliados = require('../db/models/afiliaciones.model')
const AppError = require('../utils/appError')

class Afiliado extends Afiliados {
    constructor(dni)
    { super(dni) }

    
    getAfiliado = async ()=> {
        await this.inicializacion()
        const res = await this.oBeneficiario().catch((err)=> { throw(err) })

        if (res.status == 'fail') { new AppError(res.message,404) }

        const afiliado = { nombre : res.nombre, apellido : res.apellido }

        return afiliado
    }

    getFamilia(){
        return familia
    }

    getDatosCredencial = async () => {
        const datos = await this.credecnail().catch((err)=> {console.log(err); throw(err) })
        return datos
    }

    consultaAfiliado(){
        return consulta
    }

}
module.exports = Afiliado