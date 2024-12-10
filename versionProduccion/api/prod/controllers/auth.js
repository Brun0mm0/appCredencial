const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const helpers = require('../utils/helpers')
const sendEmail = require('../utils/email')
const { promisify } = require('util');
const Afiliado = require('../models/afiliado.model');
const Usuario = require('../models/usuario.model');

// Funcion Crea TOKEN
const signToken = id => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
};

// Crea y Devuelve TOKEN cuando se loguean
const createSendToken = (user, statusCode, res, prov) => {
	console.log(prov)
	const token = signToken(user);
	res.status(statusCode).json({
		status:'success',
		token,
		id: user,
		loc:prov
	})
}

//Middelwears protege la ruta con JWT
exports.protect = catchAsync( async(req, res, next)=>{
	let token;
	if(
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}
	if(!token){
		return next(
			new AppError('No estas logeado, por favor logueate para acceder a la credencial', 404)
		);
	}
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	const dni = new Usuario(decoded.id)
	const user = dni.selectUsuarios(decoded.id)

	if(user instanceof Object) {
		req.user = user;
		next();
	} else {
		return next(
			new AppError('Este usuario ya no figura en nuestros registros', 401)
			)
		}
})

// Comprueba JWT
exports.getToken = catchAsync( async(req,res,next) => {
	res.status(200).json(
		true
	)
})

// Valida si existe el dni en Afiliaciones y si no existe en Usuarios  
exports.getAfiliado = catchAsync(async (req, res, next) => {

    const {numero} = req.body;
	const usuario = new Usuario(numero)

	let dbUsuario = await usuario.selectUsuarios(numero)
	.catch( err => { res.status(200).json({
							status: 'fail',
							msg: err.message
	})})

	
	if(dbUsuario instanceof Object) {
		res.status(200).json({
			status:'fail',
			msg:'dniExists'
		})
	} else {
		const consulta = new Afiliado(numero)
		let afiliado = await consulta.getAfiliado()
		.catch( err => { if(err.statusCode == 500 ) {
			next(new AppError(`Hubo un error, comuníquese con afiliaciones enviando un mail a atbeneficiario@osssb.com.ar o por whatsapp al 11-2761-0695`, 500))
		} else {
			res.status(200).json({
			status: 'fail',
			msg: err.message
		})
	}})
		if(afiliado) 
		res.status(200).json({
			status:'ok',
			data:afiliado
		})
	}
});

exports.getUsuario = catchAsync(async (req,res,next) => {
	const {usuario} = req.body
	const user = new Usuario(usuario)

	const datos = await user.selectUsuarios(usuario)

	if(datos){
		res.status(200).json({
			status:'fail'
		})
	} else {
		res.status(200).json({
			status:'ok'
		})
	}
})

// Graba usuario
exports.usuarioCreate = catchAsync( async(req, res, next) => {

let error = false 
	
const { usuario, nombre, apellido, tipoDocumento, documento,email,provincia,localidad,direccion,codigoPostal,telefono,password } = req.body 
const passEncrypt = await helpers.encryptPassword(password);	
const tokens = helpers.tokenCreate();

const emailToken = `${req.protocol}://credencialweb.osssb.com.ar/#/auth/confirm/${tokens.token}`
const msg = `<p>Gracias por registrarse en nuestra credencial web, por favor haga click en el linck a continuacion para finalizar con el registro.
			</p><br/> <a href="${emailToken}">${emailToken}</a>`

const crearUsuario = new Usuario(usuario, nombre, apellido, tipoDocumento, documento,email,provincia,localidad,direccion,codigoPostal,telefono,passEncrypt,tokens.encrypt)

		await crearUsuario.grabarUsuario().catch( (err) => {console.log(err, req.body); error = true; return next(new AppError('Lo sentimos hubo un error', 500)) }) 
		.then(
			await sendEmail({
			mail: email,
			subject: 'Credencial Digital Osssb',
			message: msg,
			html: msg
		})).catch( (err) => {console.log(err); error = true; return next(err) })

		if(!error){
			res.status(200).json({
				status: 'success',
			});
		}
			
});

// LogIn
exports.postLogin = catchAsync( async(req, res, next) => {

	const {usuario, password} = req.body;

	const user = new Usuario(usuario, password)
	const dni = await user.logIn()
	const prov = await user.selectUsuarios(dni).catch(err=>console.log(err))
	const afiliado = new Afiliado(dni)
	const id = await afiliado.benId()
	// console.log(prov)
	if(id) {
		createSendToken(id, 200, res, prov.pro_id)
	}
});

// Confirma el token en la tabla sinConfirmar, si exsiste graba el usuario en la tabla Usuarios y borra el registro de sinConfirmar
exports.confirmado = catchAsync( async (req,res,next) => {

	const {id} = req.body
	const usuario = new Usuario(id)
	const grabado = await usuario.confirmado().catch(err=>{next(err)})
	const prov = await usuario.selectUsuarios(grabado.dni).catch(err=>{console.log(err)})

	if(grabado) {
		createSendToken(grabado.id, 200, res, prov.pro_id)
	}
})

exports.recoverSend = catchAsync( async (req, res, next) => {

	const { dni } = req.body

	const usuario = new Usuario(dni)

	const email = await usuario.sendEmail()
	
	if(email){
			const token = helpers.tokenCreate()
			const emailToken = `${req.protocol}://credencialweb.osssb.com.ar/#/auth/recover/${token.token}`
			const msg = `<p>Por favor, haga click en el siguiente link para poder recuperar su contraseña.</p><br/>
			 <a href="${emailToken}">${emailToken}</a>`
			 const usuario = new Usuario(dni,token.encrypt)
			 await usuario.recoverPass().catch( err => { throw err })
			 await sendEmail({
				mail: email,
				subject: 'Credencial Digital Osssb',
				message: msg,
				html: msg})
			
				res.status(200).json({
				status: 'success',
			})
	} else {
		next( new AppError(`El dni ${dni} no se encuentra registrado`, 404))
	}
})

exports.recoverPass = catchAsync( async (req,res,next) => {

	const { token,pass } = req.body
	const encrypt = helpers.encryptToken(token)
	const passEncrypt = await helpers.encryptPassword(pass)

	const usuario = new Usuario(encrypt,passEncrypt)
	await usuario.grabarPass().catch( err => { throw err })
	
		res.status(200).json({
			status: 'success'
		})
	})
