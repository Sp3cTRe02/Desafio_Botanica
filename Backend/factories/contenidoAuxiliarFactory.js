const { faker} = require('@faker-js/faker')

/**
 * @David_Trujillo
 */


const crearContenidoAuxiliar = async (ctos = 1) => {
    let contenidos = [];
    for (let i = 0; i < ctos; i++) {
        let contenido = {
            titulo: faker.lorem.words(),
            descripcion: faker.lorem.paragraph()
        };
        contenidos.push(contenido);
    }
    return Promise.all(contenidos)
}

module.exports = crearContenidoAuxiliar
