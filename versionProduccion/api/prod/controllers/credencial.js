const dbAfiliaciones = require('../db/dbAfiliaciones');
const catchAsync =  require('../utils/catchAsync');
const utils = require('../utils/recordSet')
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const Afiliado = require('../models/afiliado.model');

exports.datosCredencial = catchAsync( async(req, res, next) => {
    console.log(req.body)
    const { ben_id } = req.body;

    const afiliado = new Afiliado(ben_id)
    const datos = await afiliado.getDatosCredencial().catch(err=>{console.log(err)})
    .catch( err => next( err ))

    const datosExt = fitrar(datos)

    // console.log(datosExt)

    if(datos) {
        // console.log(datos)
        res.status(200).json({
            status: 'succes',
            data: datosExt
        })
    }
})

exports.credencialPdf = catchAsync( async(req,res,next) => {

    const s300j = 's300j.pdf'
    const s300e = 's300e.pdf'
    const credencial = 's200.pdf'

    const db = dbAfiliaciones.request()

    const {dni} = req.body

    // console.log(dni)
    
    const data = utils.des(await db.query(`SELECT TOP(1) ben_ape, ben_nom,
                                           cob_nro, cob_ext, Vigente, "Plan" from oBeneficiarios
                                           WHERE ben_id = ${dni} order by cob_ini_fecha desc`).catch(err=>{console.log(err)}))
    
    // console.log(data)
    
    const extF = ext => { 
        // ext < 10 ? `0${ext}` : ext
        if(ext<10){
            return `0${ext}`
        }
        else {
            return ext
        }
    }

    console.log(data['Plan'])
    
    if(data['Plan'] == 'S300J') {
        const pdf = fs.readFileSync(`./pdfs/${s300j}`)
        const pdfDoc = await PDFDocument.load(pdf);
        const form = pdfDoc.getForm();

        const nombre = form.getTextField('Nombre')
        const afiliado = form.getTextField('Afiliado')
        const plan = form.getTextField('Plan')
        const vigente = form.getTextField('Vigente')

   
           nombre.setText(`${data['ben_nom']} ${data['ben_ape']}`)
           afiliado.setText(`${data['cob_nro']}-${extF(data['cob_ext'].toString())}`)
           plan.setText(`${data['Plan']}`)
           vigente.setText(`VIGENTE`)

           form.flatten();
   
           const pdfBytes = await pdfDoc.save()
           let stg = Buffer.from(pdfBytes.buffer, 'binary')
   
           res.setHeader('Content-Type', 'application/pdf')
           res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf')
           res.end(stg)

           console.log('procesado s300j')
       
} else if (data['Plan'] == 'S300E') {
    
        const pdf = fs.readFileSync(`./pdfs/${s300e}`)
        const pdfDoc = await PDFDocument.load(pdf);
        const form = pdfDoc.getForm();

        const nombre = form.getTextField('Nombre')
        const afiliado = form.getTextField('Afiliado')
        const plan = form.getTextField('Plan')
        const vigente = form.getTextField('Vigente')

   
           nombre.setText(`${data['ben_nom']} ${data['ben_ape']}`)
           afiliado.setText(`${data['cob_nro']}-${extF(data['cob_ext'].toString())}`)
           plan.setText(`${data['Plan']}`)
           vigente.setText(`VIGENTE`)

           form.flatten();
   
           const pdfBytes = await pdfDoc.save()
           let stg = Buffer.from(pdfBytes.buffer, 'binary')
   
           res.setHeader('Content-Type', 'application/pdf')
           res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf')
           res.end(stg)

} else {
    const pdf = fs.readFileSync(`./pdfs/${credencial}`)
    const pdfDoc = await PDFDocument.load(pdf);
    const form = pdfDoc.getForm();
    const nombre = form.getTextField('Nombre')
    const afiliado = form.getTextField('Afiliado')
    const plan = form.getTextField('Plan')
    const vigente = form.getTextField('Vigente')

    nombre.setText(`${data['ben_nom']} ${data['ben_ape']}`)
    afiliado.setText(`${data['cob_nro']}-${extF(data['cob_ext'].toString())}`)
    plan.setText(`${data['Plan']}`)
    vigente.setText(`VIGENTE`)

    form.flatten();

    const pdfBytes = await pdfDoc.save()
    let stg = Buffer.from(pdfBytes.buffer, 'binary')

    // console.log(typeof stg)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=credencial.pdf')
    res.end(stg)
   }

    // res.status(200)
})

fitrar = datos => {
    const copia = Object.assign({},datos)
    if(datos.cob_ext < 10){
        copia.cob_ext = `0${datos.cob_ext}`
    }
    return copia
}