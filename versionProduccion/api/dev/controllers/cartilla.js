const Localidad = require('../db/models/localidad.model')
const Cartilla = require('../db/models/cartilla.model')
const dbLocalidad = require('../db/models/localidad.model')
const catchAsync = require('../utils/catchAsync')

exports.getRegion = catchAsync(async (req,res,next) => {
    const db = new Localidad()
    const region = await db.getRegion()

    res.status(200).json({
        status:'succes',
        data:region
    })
})
exports.getZona = catchAsync(async (req,res,next) => {
    const {region} = req.body
    const db = new Localidad(region)
    const zona = await db.getZona()

    res.status(200).json({
        status:'succes',
        data:zona
    })
})
exports.getAtencion = catchAsync(async (req,res,next) => {
    console.log(req.body)
    const db = new Cartilla()
    const atencion = await db.getAtencion().catch(err=>{console.log(err)})

    res.status(200).json({
        status:'succes',
        data:atencion
    })
})
exports.getEspecialidad = catchAsync(async (req,res,next) => {
    console.log(req.query)
    const {id} = req.params
    const db = new Cartilla()
    const especialidad = await db.getEspecialidad(id).catch(err=>console.log(err))

    const filtrado = especialidad.map( especialidad => { 
        const dato = {}
        dato.id_especialidad = especialidad.id_especialidad
        dato.especialidad = especialidad.especialidad 
        return dato});

    console.log(filtrado)

    res.status(200).json({
        status:'succes',
        data:especialidad
    })
})
exports.getCartilla = catchAsync(async (req,res,next)=>{
    console.log(req.body)
    const{zona,atencion,especialidad,plan} = req.body
    const db = new Cartilla()
    const cartilla = await db.getCartilla(plan,zona,atencion,especialidad).catch(err=>{console.log(err)})

    res.status(200).json({
        status:'succes',
        data:cartilla
    })
}) 
exports.direccion = catchAsync(async (req,res,next)=>{
    const {id} = req.body
    const db = new Cartilla()
    const [domicilio] = await db.getDirecciones(id).catch(err=>{console.log(err)})

    const dbLoc = new dbLocalidad(domicilio.id_localidad)
    const localidad = await dbLoc.getLocalidad()

    domicilio.localidad = localidad.localidad

    res.status(200).json({
        status:'success',
        data:domicilio
    })
})
exports.consulta = catchAsync(async (req,res,next)=> {
    const {plan, reg, zona, atencion, especialidad} = req.query
    
    console.log(plan, reg, zona, atencion, especialidad)

    if(reg) {
        const db = new Localidad(reg)
        const zona = await db.getZona()
        
        res.status(200).json({
            status:'succes',
            data:zona
        })
    } else if(atencion) {
        const db = new Cartilla()
        const atencion = await db.getAtencion().catch(err=>{console.log(err)})

        res.status(200).json({
            status:'succes',
            data:atencion
        })
    } else if(especialidad) {
        const db = new Cartilla()
        const arr = await db.getEspecialidad(especialidad,plan,zona).catch(err=>console.log(err))

        const filtrado = arr.map( especialidad => { 
        const dato = {}
        dato.id_especialidad = especialidad.id_especialidad
        dato.especialidad = especialidad.especialidad 
        return dato});

    console.log(filtrado)

    res.status(200).json({
        status:'succes',
        data:filtrado
    })
    } else {
        const db = new Localidad()
        const region = await db.getRegion()
    
        res.status(200).json({
            status:'succes',
            data:region
        })
    }

})

//6744.03s