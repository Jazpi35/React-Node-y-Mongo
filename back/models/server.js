const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../databases/config');


class Server {

    constructor() {
        this.app = express();//creamos la aplicacion de express
        this.port = process.env.PORT;//configuracion del puerto

        this.paths = {
            paises: '/api/paises', // defino URL categorias
            reservas: '/api/reservas',
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        //Funcion que se ejecuta antes de llamar un controlador o seguir
        //Evita que cuando hay muchos errores no se nos dispare la ruta
        this.middlewares();

        //Rutas de aplicacion
        this.routes();
    }

    async conectarDB () {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parceo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.paths.reservas, require('../routes/reservas'));  
        this.app.use( this.paths.paises, require('../routes/paises'));  
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;