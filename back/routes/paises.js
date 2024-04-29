const { Router } = require ('express');

const { obtenerPaises, agregarPaisesDesdeJSON  } = require ('../controllers/paises')

const router = Router ();

// Obtener todas los Paises - publico 
router.get('/', obtenerPaises);
router.post('/agregar', agregarPaisesDesdeJSON);

module.exports = router;