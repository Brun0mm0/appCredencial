
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');
const dbConfig = require('../db/dbConfig');
const createDbConnect = require('../db/dbConnect');

exports.getCodPos = catchAsync( async (req,res,next) => {
	const pool = await createDbConnect(dbConfig.afiliaciones)

	const {cp} = req.body
	const rq = pool.request()
	try{

		const qy = await rq.query(`
			SELECT L.loc_id,L.loc_des,L.pro_cod,P.pro_des FROM localidades_cp LCP
			INNER JOIN localidades L
			ON LCP.loc_id = L.loc_id
			INNER JOIN provincias P
			ON L.pro_cod = P.pro_cod
			WHERE LCP.cp_cod = ${cp}
			`)
		res.status(200).json({
			status: 'ok',
			data: qy.recordset
		})
	} catch (err){
		console.log(err)
		next(new AppError(`Error query`, 500))
	} finally {
		pool.close()
	}


}) 