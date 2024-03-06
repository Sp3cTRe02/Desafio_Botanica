const { faker, fakerES } = require('@faker-js/faker');

/**
 * @David_Trujillo
 */


const crearEvento = async (ctos = 1) => {
    let eventos = [];
    const usuarios = [1,2,3]
    for (let i = 0; i < ctos; i++) {
        const evento = {
            id_usuario: usuarios[Math.floor(Math.random() * usuarios.length)],
            nombre: faker.vehicle.vehicle(),
            descripcion: faker.lorem.paragraph(),
            fecha_inicio: faker.date.recent().toLocaleDateString('en-GB'),
            latitud: faker.location.latitude(),
            longitud: faker.location.longitude(),
            ubicacion: fakerES.location.streetAddress(),
        }
        eventos.push(evento)
    }

    return Promise.all(eventos)
}


module.exports = crearEvento