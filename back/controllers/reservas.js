const { response } = require('express');
const Reserva = require('../models/reserva');


const crearReserva = async (req, res = response) => {

    try {
        
        const { origen, destino, fecha } = req.body;

        // Verifica si ya existe una reserva con la misma fecha
        const reservaExistente = await Reserva.findOne({ fecha: new Date(fecha) });

        // Si ya existe una reserva con esa fecha, envía un mensaje de error
        if (reservaExistente) {
            return res.status(400).json({
                 error: 'Ya existe una reserva con esta fecha' 
                });
        }

        // organizo la informacion que me llega del front para guardar
        const nuevaReserva = new Reserva({
            origen: {
                codigo: origen.code,
                nombre: origen.name,
                idunico: origen._id
            },
            destino: {
                codigo: destino.code,
                nombre: destino.name,
                idunico: destino._id
            },
            fecha: new Date(fecha)
        });

        // Guarda la nueva reserva en la base de datos
        await nuevaReserva.save();

        // Envía una respuesta de éxito al frontend
        res.status(201).json({ 
            mensaje: 'Reserva creada exitosamente',
            nuevaReserva 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Hubo un error al crear la reserva', detalle: error.message
        });
    }

}




const obtenerReservas  = async (req, res = response) => {
    try {
        const reservas = await Reserva.find({}, 'origen.nombre destino.nombre fecha _id');
        res.json(reservas);
    } catch (error) {
        console.error('Error al obtener todas las reservas', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }
}

module.exports = {
    crearReserva,
    obtenerReservas
}