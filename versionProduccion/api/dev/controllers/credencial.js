const catchAsync =  require('../utils/catchAsync');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const Afiliado = require('../models/afiliado.model');

exports.datosCredencial = catchAsync( async(req, res, next) => {
    const { ben_id } = req.body;

    try {
        const afiliado = new Afiliado(ben_id)
        const datos = await afiliado.getDatosCredencial()
        const respuesta = numeroExt(datos)
        res.status(200).json({
        status: 'success',
        data: respuesta
        })
    } catch (err) {
        console.log(err)
        throw err
    }
})

exports.credencialPdf = catchAsync( async(req,res,next) => {

    const {dni} = req.body
    
    try {
        const afiliado = new Afiliado(dni)
        const data = await afiliado.getDatosCredencial()
        console.log(data)
            const pdf = fs.readFileSync(filtrarPlan(data.Plan))
            const pdfDoc = await PDFDocument.load(pdf);
            const form = pdfDoc.getForm();

            const nombre = form.getTextField('Nombre')
            const af = form.getTextField('Afiliado')
            const plan = form.getTextField('Plan')
            const vigente = form.getTextField('Vigente')


        nombre.setText(`${data['nombre']} ${data['apellido']}`)
        af.setText(`${data['cob_nro']}-${numeroExt(data['cob_ext'].toString())}`)
        plan.setText(`${data['Plan']}`)
        vigente.setText(`VIGENTE`)

        form.flatten();

            const pdfBytes = await pdfDoc.save()
                let stg = Buffer.from(pdfBytes.buffer, 'binary')
                
                res.setHeader('Content-Type', 'application/pdf')
                res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf')
                res.end(stg)

        
        } catch (err) {
            console.log(err)
        }
})

filtrarPlan = plan => {
 return plan.length < 3 ? `./pdfs/s200.pdf` : `./pdfs/${plan}.pdf`   
}
numeroExt = ext => { 
    if(typeof ext === 'object') {
        const data = {...ext}
        if (data.cob_ext < 10) {
            data.cob_ext = `0${data.cob_ext}`
            return data
        } else {
            return data
        }  
    } else {
        return ext < 10 ? `0${ext}` : ext
    }
}

filtrar = datos => {
    const copia = Object.assign({},datos)
    return datos.cob_ext < 10 ? copia.cob_ext = `0${datos.cob_ext}` : copia
}