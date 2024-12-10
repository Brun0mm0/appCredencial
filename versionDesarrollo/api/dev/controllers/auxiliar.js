exports.getAfiliado = catchAsync(async (req, res, next) => {

    const {numero} = req.body;
	const usuario = new Usuario(numero)

	let dbUsuario = await usuario.getUsuario('Usuarios', numero)
	.catch( err => { return next(err)})

	if(dbUsuario) {
		const consulta = new Afiliado(numero)
		let afiliado = await consulta.getAfiliado()
		.catch( err => { return next(err)})
	
		if(afiliado)
		res.status(200).json({
			status:'ok',
			data:afiliado
		})
	}

});