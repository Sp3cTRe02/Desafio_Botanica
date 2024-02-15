const express = require('express');
const cors = require('cors');
const socketController = require('../controllers/websocketController')

class Server {

    constructor() {
        this.app = express();
        this.usuariosPath = '/api/auth';
        this.adminPath = '/api/admin'
        this.clientePath = '/api/cliente'
        this.familiaPath = '/api/familia'
        this.arbolesPath = '/api/arboles'
        this.contenidoPath = '/api/contenido'

        this.serverExpresss = require('http').createServer(this.app)
        this.serverWebSocket = require('http').createServer(this.app)
        this.io = require('socket.io')(this.serverWebSocket, {
            cors: {
                origins: ["http://localhost:4200"],
                methods: ["*"],
                allowedHeaders: [""],
                credentials: true
            }
        })

        //Middlewares
        this.middlewares();

        this.routes();

        this.sockets()
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/authRoutes'));
        this.app.use(this.adminPath, require('../routes/adminRoutes'))
        this.app.use(this.clientePath, require('../routes/clienteRoutes'))
        this.app.use(this.familiaPath, require('../routes/familiaRoutes'))
        this.app.use(this.arbolesPath, require('../routes/arbolesRoutes'))
        this.app.use(this.contenidoPath, require('../routes/contenidoRoutes'))
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.serverExpresss.listen(process.env.PORT, () => {
            console.log(`Servidor Express escuchando en: ${process.env.PORT}`);
        });

        this.serverWebSocket.listen(process.env.WEBSOCKETPORT, () => {
            console.log(`Servidor de WebSockets escuchando en: ${process.env.WEBSOCKETPORT}`);
        });
    }
}

module.exports = Server;