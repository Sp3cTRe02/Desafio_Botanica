const { faker} = require('@faker-js/faker')

/**
 * @David_Trujillo
 */


const crearNoticia = async (ctos = 1) => {
    let noticias = [];
    for (let i = 0; i < ctos; i++) {
        let noticia = {
            id_usuario: 1,
            titulo: faker.lorem.words(),
            resumen_desc: faker.lorem.sentence(),
            descripcion: faker.lorem.paragraph()
        };
        noticias.push(noticia);
    }
    return Promise.all(noticias)
}

module.exports = crearNoticia
