const Usuarios = require('../db/models/usuarios.model');
const Argos = require('../db/models/afiliaciones.model');
const AppError = require('../utils/appError');
const { encryptToken, matchPassword } = require('../utils/helpers');

class Usuario extends Usuarios{
    constructor( usuario, nombre, apellido, tipoDocumento, documento, email,
        provincia, localidad, direccion, codigoPostal, telefono, password, token ){
        super(usuario, nombre, apellido, tipoDocumento, documento, email,
            provincia, localidad, direccion, codigoPostal, telefono, password, token )
    }
    grabarUsuario = async () => {
        await this.deleteSinConfirmar(this.documento).catch(err=> {throw err})
        await this.insertSinConfirmar().catch(err=> {throw err})
    }
    logIn = async () => {

        const existe = await this.selectUsuarios(this.usuario).catch( err => { throw err })
        if(existe instanceof Object) {
            const pass = await matchPassword(`${this.nombre}`,existe.Passwd).catch(err => console.log(err))
            if(pass) {
                return existe.DocNro
            } else {
                throw new AppError(`Hubo un error, revise su usuario y contraseña`, 401)
            }
        }else{
            throw new AppError(`Hubo un error, revise su usuario y contraseña`, 401)
        }
    }

    recoverPass = async () => {
        await this.deleteRecover(this.usuario).catch( err => { throw err });
        await this.insertarRecover().catch( err => { throw err });
    }

    grabarPass = async () => { 
        const dni = await this.selectRecover(this.usuario).catch( err => { throw err })
        await this.updateRecover(dni.dni).catch( err => { throw err })
        await this.deleteRecover(dni.dni).catch( err => { throw err })
    }

    sendEmail = async () => {
        const existe = await this.selectUsuarios(this.usuario)
        if(existe) {
            return existe.Email
        }
        return
    }

    confirmado = async () => {
        
        const tokenEncrypt = encryptToken(this.usuario)
        const usuario = await this.selectPortalOsssb('sinConfirmar',tokenEncrypt).catch(err=>console.log(err))
        if(usuario) {

            await this.insertUsuarios(  usuario.Usuario,
                usuario.Nombre,
                usuario.Apellido,
                usuario.DocTipoId,
                usuario.DocNro,
                usuario.Email,
                usuario.pro_id,
                usuario.loc_id,
                usuario.Domicilio,
                usuario.cp_id,
                usuario.Telefono,
                usuario.Passwd ).catch(err=>console.log(err))
                                
                const argos = new Argos(usuario.DocNro)
                const {ben_id} = await argos.oBeneficiario().catch(err=>console.log(err))
                const res = {id:ben_id,dni:usuario.DocNro}
                
		await this.deleteSinConfirmar(usuario.DocNro)

                return res
            } else {
                throw new AppError(`Hubo un error, intente ingresar con su usuario y contraseña desde la página de inicio. Si no lo logra, vuelva a repetir el proceso de registro. Disclupe las molestias.`, 404)
            }

    }


}
module.exports = Usuario