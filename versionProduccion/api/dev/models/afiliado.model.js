const Afiliados = require('../db/models/afiliaciones.model')

class Afiliado extends Afiliados {
    constructor(dni)
    { super(dni) 
        this.inicializacion()
    }
    
    getAfiliado = async ()=> {
        try {
            await this.inicializacion()
            const res = await this.oBeneficiario()
            return { nombre : res.nombre, apellido : res.apellido }
        } catch (err){
            throw err
        } 
    }
               
    getDatosCredencial = async () => {
        try {
            const datos = await this.credencial()
            return datos
        } catch (err) {
            console.log(err); 
            throw(err)
        }
    }
}

module.exports = Afiliado