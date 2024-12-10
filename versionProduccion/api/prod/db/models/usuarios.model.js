const AppError = require('../../utils/appError');
const { recordset } = require('../../utils/recordSet');
const { VarChar, PreparedStatement } = require('mssql');
const pool = require('../dbUsuarios');
const db = new PreparedStatement(pool)

db.input('usuario', VarChar)
db.input('nombre', VarChar)
db.input('apellido', VarChar)
db.input('docTipoId', VarChar)
db.input('docNro', VarChar)
db.input('email', VarChar)
db.input('telefono', VarChar)
db.input('passwd', VarChar)
db.input('pro_id', VarChar)
db.input('idProvincia', VarChar)
db.input('loc_id', VarChar)
db.input('domicilio', VarChar)
db.input('cp_id', VarChar)
db.input('token', VarChar(200))



class Usuarios {
    constructor(
        usuario, nombre, apellido, tipoDocumento, documento, email,
        provincia, localidad, direccion, codigoPostal, telefono, password, token 
    ){
        this.usuario = usuario, this.nombre = nombre, this.apellido = apellido, 
        this.tipoDocumento = tipoDocumento, this.documento = documento, this.email = email,
        this.provincia = provincia, this.localidad = localidad, this.direccion = direccion,
        this.codigoPostal = codigoPostal, this.telefono = telefono, this.password = password,
        this.token = token
    }
    
    
    insertSinConfirmar = async () => {

        await db.prepare( `INSERT sinConfirmar (Usuario, Nombre, Apellido, DocTipoId, DocNro, Email, Telefono, Passwd, pro_id, idProvincia,loc_id, Domicilio, cp_id, token)
        values (@Usuario, @Nombre, @Apellido, @DocTipoId, @DocNro, @Email, @Telefono, @Passwd, @pro_id, @idProvincia, @loc_id, @Domicilio, @cp_id, @token)`).catch( err => {throw err})
            
        await db.execute({usuario:this.usuario,nombre:this.nombre,apellido:this.apellido,docTipoId:this.tipoDocumento,docNro:this.documento,email:this.email,
                          telefono:this.telefono,passwd:this.password,pro_id:this.provincia,idProvincia:'0000',loc_id:this.localidad,domicilio:this.direccion,
                          cp_id:this.codigoPostal,token:this.token
            }).catch( err => { db.unprepare();throw err })

        await db.unprepare().catch( err => {throw err})


        return
        }
        
    insertUsuarios = async (usuario, nombre, apellido, tipoDocumento, documento, email, provincia, localidad, direccion, codigoPostal, telefono, password) => {
      
        await db.prepare( `INSERT Usuarios (Usuario, Nombre, Apellido, DocTipoId, DocNro, Email, Telefono, Passwd, pro_id, idProvincia,loc_id, Domicilio, cp_id)
        values (@Usuario, @Nombre, @Apellido, @DocTipoId, @DocNro, @Email, @Telefono, @Passwd, @pro_id, @idProvincia, @loc_id, @Domicilio, @cp_id)`).catch(err => { console.log(err); throw err})
        
        await db.execute({usuario:usuario,nombre:nombre,apellido:apellido,docTipoId:tipoDocumento,docNro:documento,email:email,telefono:telefono,
                          passwd:password,pro_id:provincia,idProvincia:'0000',loc_id:localidad,domicilio:direccion,cp_id:codigoPostal
            }).catch(err => { db.unprepare();throw err })
                
        await db.unprepare().catch(err => { throw new AppError('Error de servidor, comuniquese con afiliaciones', 500) })

        return
        } 

    insertarRecover = async () => {
        console.log(this.usuario)
        console.log(this.nombre)
        await db.prepare(`INSERT INTO Recover VALUES (@token, @docNro)`).catch(err => { db.unprepare(); throw err })
        await db.execute({docNro:this.usuario,token:this.nombre}).catch(err=> { console.log('execute');db.unprepare();throw err })
        await db.unprepare().catch(err => { throw err })
        return
    }

    updateRecover = async (dni) => {
        console.log(this.nombre)
        await db.prepare(`UPDATE Usuarios set Passwd = @passwd WHERE DocNro = @docNro`).catch( err => { db.unprepare(); throw err })
        await db.execute({passwd:this.nombre,docNro:dni}).catch( err => { db.unprepare(); throw err })
        await db.unprepare().catch( err => { throw err })
    }

    deleteRecover = async (dni) => {
        await pool.query(`
            DELETE FROM recover WHERE dni = ${dni}
        `).catch(err=>{throw err})
        return
    }

    selectRecover = async (token) => {
        const dni = await pool.query(`
            SELECT dni FROM Recover where token = '${token}'
        `)
        console.log('dni: ',dni,' token: ',this.usuario )
        return dni.recordset[0]
    }

    deleteSinConfirmar = async (dato) => {
        await pool.query(`
        DELETE FROM sinConfirmar WHERE DocNro = '${dato}'
        `)
            return 
    }    
    
        
    selectUsuarios = async (dato) => {
        let [consulta] = recordset(await pool.query(`
        SELECT * FROM Usuarios WHERE DocNro = '${dato}' OR Usuario = '${dato}'
        `))
        return consulta
    }
    
    selectPortalOsssb = async (db,dato) => {

        let [consulta] = recordset(await pool.query(`
            SELECT * FROM ${db} where DocNro = '${dato}' OR  Usuario = '${dato}' OR token = '${dato}'
        `).catch((err) => {
            throw err
                // throw new AppError('Hubo un error, por favor intente nuevamente o comuníquese con afiliaciones', 500)
        }))
            // console.log(consulta)
            return consulta
        }
    }


module.exports = Usuarios