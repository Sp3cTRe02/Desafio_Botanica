const { faker} = require('@faker-js/faker')

/**
 * @David_Trujillo
 */


const crearNoticia = async (ctos = 1) => {
    let noticias = [];
    for (let i = 0; i < ctos; i++) {
        let noticia = {
            idusuario: 1,
            titulo: faker.lorem.words(),
            resumenDesc: faker.lorem.sentence(),
            descripcion: faker.lorem.paragraph()
        };
        noticias.push(noticia);
    }
    return Promise.all(noticias)
}

module.exports = crearNoticia
