const sql = require('mssql');
const AppError = require('../../utils/appError');
const { recordset } = require('../../utils/recordSet');
const createDbConnect = require('../dbConnect');
const dbConfig = require('../dbConfig');

class Usuarios {
    constructor(
        usuario, nombre, apellido, tipoDocumento, documento, email,
        provincia, localidad, direccion, codigoPostal, telefono, password, token 
    )
    {
        this.pool = null;
        this.usuario = usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipoDocumento = tipoDocumento;
        this.documento = documento;
        this.email = email;
        this.provincia = provincia;
        this.localidad = localidad;
        this.direccion = direccion;
        this.codigoPostal = codigoPostal;
        this.telefono = telefono;
        this.password = password;
        this.token = token;
    }
    
    inicializacion = async () => {
        this.pool = await createDbConnect(dbConfig.usuarios);
    }

    insertSinConfirmar = async () => {
        await this.inicializacion()
        const db = new sql.PreparedStatement(this.pool);

        db.input('usuario', sql.VarChar);
        db.input('nombre', sql.VarChar);
        db.input('apellido', sql.VarChar);
        db.input('docTipoId', sql.VarChar);
        db.input('docNro', sql.VarChar);
        db.input('email', sql.VarChar);
        db.input('telefono', sql.VarChar);
        db.input('passwd', sql.VarChar);
        db.input('pro_id', sql.VarChar);
        db.input('idProvincia', sql.VarChar);
        db.input('loc_id', sql.VarChar);
        db.input('domicilio', sql.VarChar);
        db.input('cp_id', sql.VarChar);
        db.input('token', sql.VarChar(200));

        const queryStr = `
            INSERT INTO sinConfirmar (Usuario, Nombre, Apellido, DocTipoId, DocNro, Email, Telefono, Passwd, pro_id, idProvincia, loc_id, Domicilio, cp_id, token)
            VALUES (@usuario, @nombre, @apellido, @docTipoId, @docNro, @email, @telefono, @passwd, @pro_id, @idProvincia, @loc_id, @domicilio, @cp_id, @token)
        `;

        try {
            await db.prepare(queryStr);
            await db.execute({
                usuario: this.usuario, nombre: this.nombre, apellido: this.apellido, docTipoId: this.tipoDocumento, 
                docNro: this.documento, email: this.email, telefono: this.telefono, passwd: this.password, 
                pro_id: this.provincia, idProvincia: '0000', loc_id: this.localidad, domicilio: this.direccion, 
                cp_id: this.codigoPostal, token: this.token
            });
        } catch (err) {
            await db.unprepare();
            throw err;
        } finally {
            await db.unprepare();
            this.pool.close()
        }
    }

    insertUsuarios = async (usuario, nombre, apellido, tipoDocumento, documento, email, provincia, localidad, direccion, codigoPostal, telefono, password) => {
        
        await this.inicializacion()
        
        const db = new sql.PreparedStatement(this.pool);

        db.input('usuario', sql.VarChar);
        db.input('nombre', sql.VarChar);
        db.input('apellido', sql.VarChar);
        db.input('docTipoId', sql.VarChar);
        db.input('docNro', sql.VarChar);
        db.input('email', sql.VarChar);
        db.input('telefono', sql.VarChar);
        db.input('passwd', sql.VarChar);
        db.input('pro_id', sql.VarChar);
        db.input('idProvincia', sql.VarChar);
        db.input('loc_id', sql.VarChar);
        db.input('domicilio', sql.VarChar);
        db.input('cp_id', sql.VarChar);

        const queryStr = `
            INSERT INTO Usuarios (Usuario, Nombre, Apellido, DocTipoId, DocNro, Email, Telefono, Passwd, pro_id, idProvincia, loc_id, Domicilio, cp_id)
            VALUES (@usuario, @nombre, @apellido, @docTipoId, @docNro, @email, @telefono, @passwd, @pro_id, @idProvincia, @loc_id, @domicilio, @cp_id)
        `;

        try {
            await db.prepare(queryStr);
            await db.execute({
                usuario, nombre, apellido, docTipoId: tipoDocumento, docNro: documento, email, telefono, 
                passwd: password, pro_id: provincia, idProvincia: '0000', loc_id: localidad, domicilio: direccion, 
                cp_id: codigoPostal
            });
        } catch (err) {
            await unprepare()
            throw err;
        } finally {
            await db.unprepare();
            this.pool.close()
        }
    }

    insertarRecover = async () => {
        await this.inicializacion()
        const db = new sql.PreparedStatement(this.pool);

        db.input('token', sql.VarChar(200));
        db.input('docNro', sql.VarChar);

        const queryStr = `
            INSERT INTO Recover VALUES (@token, @docNro)
        `;


        try {
            await db.prepare(queryStr);
            await db.execute({
                docNro: this.usuario, token: this.nombre
            });
        } catch (err) {
            console.log(err)
            await db.unprepare();
            throw err;
        } finally {
            await db.unprepare();
            this.pool.close()
        }
    }

    updateRecover = async (dni) => {
        await this.inicializacion()
        const db = new sql.PreparedStatement(this.pool);

        db.input('passwd', sql.VarChar);
        db.input('docNro', sql.VarChar);

        const queryStr = `
            UPDATE Usuarios SET Passwd = @passwd WHERE DocNro = @docNro
        `;

        try {
            await db.prepare(queryStr);
            await db.execute({
                passwd: this.nombre, docNro: dni
            });
        } catch (err) {
            await db.unprepare();
            throw err;
        } finally {
            await db.unprepare();
            this.pool.close()
        }
    }

    deleteRecover = async (dni) => {
        await this.inicializacion()
        try {
            await this.pool.query(`
                DELETE FROM Recover WHERE dni = ${dni}
            `)
        } catch (err) {
            console.log(err)
            throw err;
        } finally {
            this.pool.close ()
        }
    }

    selectRecover = async (token) => {
        await this.inicializacion()
        try {
            const result = await this.pool.query(`
                SELECT dni FROM Recover WHERE token = '${token}'
            `)
            
            return result.recordset[0];
        } catch (err) {
            console.log(err)
            throw err;
        } finally {
            this.pool.close()
        }
    }

    deleteSinConfirmar = async (dato) => {

        await this.inicializacion()

        try {
            await this.pool.query(`
                DELETE FROM sinConfirmar WHERE DocNro = '${dato}'
            `)
        } catch (err) {
            throw err;
        } finally {
            this.pool.close()
        }
    }

    selectUsuarios = async (dato) => {
        let qryStr = `SELECT * FROM Usuarios WHERE Usuario = '${dato}' OR DocNro = '${dato}'`
        
        try {
            await this.inicializacion()
            const [consulta] = recordset(await this.pool.query(qryStr))
            return consulta ? consulta : false;
        } catch (err) {
            throw err;
        } finally {
            this.pool.close()
        }
    }

    selectPortalOsssb = async (db, dato) => {
        await this.inicializacion()
        try {
            const [consulta] = recordset(await this.pool.query(`
                SELECT * FROM ${db} WHERE DocNro = '${dato}' OR Usuario = '${dato}' OR token = '${dato}'
            `));
            
            return consulta;
        } catch (err) {
            throw err;
        } finally {
            this.pool.close()
        }
    }
}

module.exports = Usuarios;
