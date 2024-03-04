const request = require('supertest');
const express = require('express');
const routes = require('../routes/arbolRoutes.js');
const { it } = require('@faker-js/faker');

const app = express();
app.use(express.json());
app.use('/', routes);

//Jaime_Rafael
describe( 'Test para la ruta post', () => {
    test('Debería responder con un status 200', async () => {
        const ruta = {
            radio : 1,
            latitud : -4,
            longitud : 38
        }

        const response = await request(app).post('/ruta').send(ruta);
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe('Ubicaciones encontradas');


    });
    
});
