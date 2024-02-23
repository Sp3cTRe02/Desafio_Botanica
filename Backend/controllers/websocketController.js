/**
 * @David_Trujillo
 */

const socketController = (socket) => {
    console.log(`Cliente ${socket.id} conectado en ${process.env.WEBSOCKETPORT}`)

    socket.on('disconnect', () => {
        console.log("Cliente desconectado", socket.id);
    });

    socket.on('crear-contenido', (contenido) => {
        socket.broadcast.emit('nuevo-contenido', contenido);
    });
}

module.exports = socketController;