const { faker, fakerES } = require('@faker-js/faker');

const crearEvento = async (ctos = 1) => {
    let eventos = [];
    for (let i = 0; i < ctos; i++) {
        const evento = {
            nombre: faker.vehicle.vehicle(),
            descripcion: faker.lorem.paragraph(),
            fechaInicio: faker.date.anytime(),
            latitud: faker.location.latitude(),
            longitud: faker.location.longitude(),
            ubicacion: fakerES.location.streetAddress(),
        }
        eventos.push(evento)
    }

    return Promise.all(eventos)
}


module.exports = crearEvento