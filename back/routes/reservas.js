const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {crearReserva, obtenerReservas} = require('../controllers/reservas');

const router = Router();

router.post('/', [
    check('origen.code', 'El código de origen es obligatorio').not().isEmpty(),
    check('origen.name', 'El nombre de origen es obligatorio').not().isEmpty(),
    check('destino.code', 'El código de destino es obligatorio').not().isEmpty(),
    check('destino.name', 'El nombre de destino es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    validarCampos,
], crearReserva);

router.get ('/', obtenerReservas);



module.exports = router;