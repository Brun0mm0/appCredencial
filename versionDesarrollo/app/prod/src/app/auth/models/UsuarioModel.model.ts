import { Subject } from "rxjs"
import { DataBaseService } from "src/app/data/data-base.service"

export class UsuarioModel {
    constructor(
        private db:DataBaseService,
        public tipoDocumento: String, 
        public documento: String, 
        public usuario:String, 
        public nombre: String, 
        public apellido: String, 
        public email: String,
        public provincia: String, 
        public localidad: String, 
        public direccion: String, 
        public codigoPostal: String, 
        public telefono: String, 
        public password: String, 
    ){}

    setTipoDocumento = (tipo:String) => {
        this.tipoDocumento = tipo
    }
    setDocumento = (documento:String) => {
        this.documento = documento
    }
    setNombre = (nombre:String) => {
        this.nombre = nombre
    }
    setApellido = (apellido:String) => {
        this.apellido = apellido
    }
    setEmail = (email:String) => {
        this.email = email
    }
    setTelefono = (telefono : String) => {
        this.telefono = telefono
    }
    setCP = (cp:String) => {
        this.codigoPostal = cp
    }
    setProvincia = (provincia:String) => {
        this.provincia = provincia
    }
    setLocalidad = (localidad:String) => {
        this.localidad = localidad
    }
    setDireccion = (dir:String) => {
        this.direccion = dir
    }
    setUsuario = (usuario:String) => {
        this.usuario = usuario
    }
    setPassword = (password:String) => {
        this.password = password
    }
    getUsuario = () => {
        return this
    }
    insertUsuario = () => {
        return this.db.postUsuario({
        tipoDocumento: this.tipoDocumento,
        documento: this.documento,
        usuario: this.usuario,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        provincia: this.provincia,
        localidad: this.localidad,
        direccion: this.direccion,
        codigoPostal: this.codigoPostal,
        telefono: this.telefono,
        password: this.password
        })
    }

}