exports.des = (data) => {
	// console.log(data)
	const {recordset} = data;
	const [afiliado] = recordset;

	if(recordset == 0) {
		return false
	} else {
		return afiliado
	}
}
exports.desestrurar = (data) => {
	const {recordset} = data;
	// console.log(recordset)
	if(recordset.length > 1){
		Afiliado = {
		familia : []
		}
		for(let afiliado of recordset) {
			if(afiliado.ben_id !== afiliado.Titular_ID && afiliado.Vigente == 1) {
				Afiliado.familia.push({
					nombre: `${afiliado.ben_nom} ${afiliado.ben_ape}`,
					dni: afiliado.ben_doc_nro
				})
			} else if(afiliado.Vigente !== 0) {
				Afiliado.nombre = afiliado.ben_nom;
				Afiliado.apellido = afiliado.ben_ape;
				Afiliado.dni = afiliado.ben_doc_nro;
				Afiliado.numAfiliado = afiliado.cob_nro;
				// Afiliado.numAfiliadoExt = afiliado.cob_ext;
				Afiliado.vigente = afiliado.Vigente;
				Afiliado.plan = afiliado.Plan
				if(afiliado.cob_ext < 10){
					let ext = afiliado.cob_ext.toString()
					Afiliado.numAfiliadoExt = `0${ext}`
				} else {
					Afiliado.numAfiliadoExt = afiliado.cob_ext
				}
			}
		}
		return Afiliado;
	} else {
		const [afiliado] = recordset ;
		Afiliado = {
			Titular_ID:afiliado.Titular_ID,
			ben_id:afiliado.ben_id,
			nombre:afiliado.ben_nom,
			apellido:afiliado.ben_ape,
			dni:afiliado.ben_doc_nro,
			numAfiliado:afiliado.cob_nro,
			// numAfiliadoExt:afiliado.cob_ext,
			vigente:afiliado.Vigente,
			plan:afiliado.Plan
		}
		if(afiliado.cob_ext < 10){
			let ext = afiliado.cob_ext.toString()
			Afiliado.numAfiliadoExt = `0${ext}`
		} else {
			Afiliado.numAfiliadoExt = afiliado.cob_ext
		}
		return Afiliado;
	}
};

exports.isEmpty = (obj) => {
	for (var property in obj) {
		if (obj.hasOwnProperty(property)){
			return false;
		}
	}
	return true;
}

exports.recordset = (data) => {
	// console.log(data)
	const {recordsets} = data;
	const [afiliado] = recordsets;

	return afiliado
}