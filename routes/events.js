/*  Rutas de Eventos
    /api/events 
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEventos, actualizarEvento, deleteEvento } = require("../controllers/events");
const { isDate } = require('../helpers/isDate');

const router = Router();

// Validacion de los eventos con JWT
router.use( validarJWT );

// Obtener Eventos
router.get('/', getEventos );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatorio').custom( isDate ),
        check('end','Fecha de finalización es obligatorio').custom( isDate ),
        validarCampos
    ],
    crearEventos
);

// Actualizar Eventos
router.put('/:id', actualizarEvento );

//  Eliminar Evento
router.delete('/:id', deleteEvento );


module.exports = router;
