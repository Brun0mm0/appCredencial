const db = require('../db/dbAfiliaciones');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');
const { ok } = require('assert');

exports.getCodPos = catchAsync( async (req,res,next) => {

	const {cp} = req.body
	const rq = db.request() 
	const qy = await rq.query(`
		SELECT L.loc_id,L.loc_des,L.pro_cod,P.pro_des FROM localidades_cp LCP
		INNER JOIN localidades L
		ON LCP.loc_id = L.loc_id
		INNER JOIN provincias P
		ON L.pro_cod = P.pro_cod
		WHERE LCP.cp_cod = ${cp}
	`).catch(err => new AppError(`Error query`, 500))

	res.status(200).json({
		status: ok,
		data: qy.recordset
	})

}) 