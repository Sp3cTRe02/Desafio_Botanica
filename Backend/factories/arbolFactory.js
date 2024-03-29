const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');


/**
 * Factoria hecho por @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */

const crearArbol = async (ctos = 1) => {
    const familias = [1,2,3]
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre', 'Noviembre','Diciembre']

    let arboles = []
    for (let i = 0; i < ctos; i++) {
        const arbol = {
            id_familia : familias[Math.floor(Math.random() * familias.length)],
            nombre : faker.vehicle.vehicle(),
            ep_floracion : meses[Math.floor(Math.random() * meses.length)],
            descripcion : faker.lorem.paragraph(),
        }
        arboles.push(arbol)
    }
    return Promise.all(arboles)
}

module.exports = crearArbol