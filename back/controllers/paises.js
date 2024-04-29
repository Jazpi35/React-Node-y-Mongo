const { response } = require ('express');
const  Pais  = require ('../models/pais');


// Obtener Paises - paginado - total - populate

const obtenerPaises = async (req , res = response ) => {
    
    try {
        const paises = await Pais.find();
        res.json(paises);
    } catch (error) {
        console.error('Error al obtener todos los paises', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
}

const  agregarPaisesDesdeJSON = async (req, res) => {
    try {
      // Reemplaza la ruta con la ubicación real de tu archivo JSON
      const paisesJSON = require('../models/Countries.json');
  
      // Itera sobre los datos y guárdalos en la base de datos
      await Promise.all(paisesJSON.countries.map(async (paisData) => {
        const pais = new Pais({
          name: paisData.name,
          code: paisData.code
        });
        await pais.save();
      }));
  
      res.status(200).json({ message: 'Países agregados exitosamente desde el archivo JSON.' });
    } catch (error) {
      console.error('Error al agregar países desde el archivo JSON:', error);
      res.status(500).json({ error: 'Hubo un error al agregar países desde el archivo JSON.' });
    }
};


module.exports = {
    obtenerPaises,
    agregarPaisesDesdeJSON
}