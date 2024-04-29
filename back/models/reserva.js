const { Schema, model } = require('mongoose');

const ReservaSchema = Schema({

    origen: {
        codigo: {
            type: String,
            required: [true, "El código de origen es obligatorio"]
        },
        nombre: {
            type: String,
            required: [true, "El nombre de origen es obligatorio"]
        },
        idunico: {
            type: String,
            required: [true, "El id único de origen es obligatorio"]
        }
    },

    destino: {
        codigo: {
            type: String,
            required: [true, "El código de destino es obligatorio"]
        },
        nombre: {
            type: String,
            required: [true, "El nombre de destino es obligatorio"]
        },
        idunico: {
            type: String,
            required: [true, "El id único de destino es obligatorio"]
        }
    },
    
    fecha: {
        type: Date,
        required: [true, "La fecha de la reserva es obligatoria"],
        
    }
});
module.exports = model('Reserva', ReservaSchema);