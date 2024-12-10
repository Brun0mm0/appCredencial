const Usuarios = require('../db/models/usuarios.model');
const Argos = require('../db/models/afiliaciones.model');
const AppError = require('../utils/appError');
const { encryptToken, matchPassword } = require('../utils/helpers');

class Usuario extends Usuarios{
    constructor( usuario, nombre, apellido, tipoDocumento, documento, email,
        provincia, localidad, direccion, codigoPostal, telefono, password, token ){
        super(
            usuario, nombre, apellido, tipoDocumento, documento, email,
            provincia, localidad, direccion, codigoPostal, telefono, password, token,
            // this.inicializacion()
        )
    }
    grabarUsuario = async () => {
        try{
            await this.deleteSinConfirmar(this.documento)
            await this.insertSinConfirmar()
        } catch (err) {
            throw err
        }
    }

    logIn = async () => {
        console.log(this.usuario)

        try {
            const existe = await this.selectUsuarios(this.usuario)
        if(existe) {
            const pass = await matchPassword(`${this.nombre}`,existe.Passwd)
            console.log(pass)
        if(pass) {
            return existe.DocNro
        } else {
            throw new AppError(`Hubo un error, revise su usuario y contraseña`, false, 401)
        }
    }else{
        throw new AppError(`Hubo un error, revise su usuario y contraseña`, false, 401)
    }
        } catch (err) {
            throw err
        }
}

    recoverPass = async () => {
        try{
        await this.deleteRecover(this.usuario);
        await this.insertarRecover();
        } catch (err) {
            console.log(err)
            throw err 
        }
    }

    grabarPass = async () => { 
        try {
            const dni = await this.selectRecover(this.usuario)
            console.log(dni)
                await this.updateRecover(dni.dni)
                await this.deleteRecover(dni.dni)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    sendEmail = async () => {
        
        await this.inicializacion()
            const existe = await this.selectUsuarios(this.usuario)
            console.log(existe, 'existe')
            return existe ? existe.Email : new AppError(`El dni ${this.usuario} no se encuentra registrado`, false, 404)
    }

    confirmado = async () => {
        const tokenEncrypt = encryptToken(this.usuario)

        try {

                const usuario = await this.selectPortalOsssb('sinConfirmar',tokenEncrypt)
        
            if(usuario) {
            
            await this.insertUsuarios( usuario.ID )
                const argos = new Argos(usuario.DocNro)

            await argos.inicializacion()
                const {ben_id} = await argos.oBeneficiario()
                const res = {id:ben_id,dni:usuario.DocNro}

            await this.deleteSinConfirmar(usuario.DocNro)

            return res
        } else {
            throw new AppError(`Hubo un error, intente ingresar con su usuario y contraseña desde la página de inicio. Si no lo logra, vuelva a repetir el proceso de registro. Disculpe las molestias.`, false, 404)
        }
            } catch (err) {
                console.log(err)
            }
    }


}
module.exports = Usuario