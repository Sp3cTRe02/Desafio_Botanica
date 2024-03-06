const { faker, fakerES, fa } = require('@faker-js/faker');

/**
 * @David_Trujillo
 */


const participaEvento = async (ctos = 1) => {
    let eventosParticipa = [];
    const usuarios = [1,2,3]
    const eventos = [1,2,3]

    for (let i = 0; i < ctos; i++) {
        const evento = {
            id_evento: eventos[Math.floor(Math.random() * eventos.length )],
            id_usuario:  usuarios[Math.floor(Math.random() * usuarios.length)],
            fecha_participacion: faker.date.recent()
        }
        eventosParticipa.push(evento)
    }

    return Promise.all(eventosParticipa)
}


module.exports = participaEvento