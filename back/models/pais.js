const { Schema, model} = require ('mongoose');
const PaisSchema = Schema({
    name: {
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    code : {
        type: String,
        required: [true,'El code es obligatorio']
    }
});

module.exports = model('Pais',PaisSchema);