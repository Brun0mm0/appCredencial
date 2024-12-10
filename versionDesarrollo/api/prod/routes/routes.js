const express = require('express');
const auth = require('../controllers/auth');
const credencial = require('../controllers/credencial');
const localidades = require('../controllers/localidades');
const cartilla = require('../controllers/cartilla')
const router = express.Router();


router.route('/localidades')
        .post(localidades.getCodPos)
router.route('/recover')
        .post(auth.recoverSend)
router.route('/recoverConfirm')
        .post(auth.recoverPass)        
router.route('/confirm')
        .post(auth.confirmado)
router.route('/exists')
        .post(auth.getUsuario)
router.route('/')
        .post(auth.getAfiliado)
router.route('/log')
        .post(auth.getToken)
router.route('/auth')
        .get(auth.protect, auth.getToken)
        .post(auth.postLogin)
        
router.route('/usuario')
        .post(auth.usuarioCreate)

router.use(auth.protect);
        
router.route('/credencial')
        .post(credencial.datosCredencial);
router.route('/credencialPdf')
        .post(credencial.credencialPdf);
router.route('/cartilla/region')
        .post(cartilla.getRegion)                
router.route('/cartilla/zona')
        .post(cartilla.getZona)                
router.route('/cartilla/atencion')
        .post(cartilla.getAtencion)                
router.route('/cartilla/especialidad/:id')
        .post(cartilla.getEspecialidad)
router.route('/cartilla/cartilla')
        .post(cartilla.getCartilla)
router.route('/cartilla/direccion')
        .post(cartilla.direccion)     
router.route('/cartilla')
        .get(cartilla.consulta);
        
        
module.exports = router;