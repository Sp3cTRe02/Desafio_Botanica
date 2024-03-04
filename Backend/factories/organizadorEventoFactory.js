/**
 * @David_Trujillo
 */


const organizadorEvento = async (ctos = 1) => {
    let eventosOrganizador = [];
    const usuarios = [1,2,3]
    const eventos = [1,2,3]

    for (let i = 0; i < ctos; i++) {
        const evento = {
            idEvento: eventos[Math.floor(Math.random() * eventos.length )],
            idUsuario:  usuarios[Math.floor(Math.random() * usuarios.length)],
        }
        eventosOrganizador.push(evento)
    }

    return Promise.all(eventosOrganizador)
}


module.exports = organizadorEvento