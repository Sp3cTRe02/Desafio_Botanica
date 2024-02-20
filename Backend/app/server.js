const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

//https://sequelize.org/docs/v6/getting-started/

class Server {

    constructor() {
        this.app = express();
        this.usuariosPath = '/api/auth';
        this.adminPath = '/api/admin'
        this.clientePath = '/api/cliente'
        this.familiaPath = '/api/familia'
        this.arbolPath = '/api/arbol'

        //Middlewares
        this.middlewares();

        this.routes();
        
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))

        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath , require('../routes/authRoutes'));
        this.app.use(this.adminPath, require('../routes/adminRoutes'))
        this.app.use(this.clientePath,require('../routes/clienteRoutes'))
        this.app.use(this.familiaPath,require('../routes/familiaRoutes'))
        this.app.use(this.arbolPath,require('../routes/arbolRoutes'))

    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;