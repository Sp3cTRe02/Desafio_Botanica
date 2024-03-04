const request = require('supertest');
const express = require('express');
const routes = require('../routes/arbolesRoutes.js')

const app = express();
app.use(express.json());
app.use('/', routes);

//Jaime_Rafael
describe('Test para los metodos get ', () => {
    test('Debe responder al método GET en /lista-arboles y responder un codigo 200', async () => {
        const response = await request(app).get('/lista-arboles');
        expect(response.statusCode).toBe(200);
    });

    test('Debe responder al método GET en /:id y responder un codigo 200 y succest true', async () => {
        const response = await request(app).get('/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true)
    });

    test('Debe responder al método GET en /:id y responder un codigo 500 y succest false', async () => {
        const response = await request(app).get('/0');
        expect(response.statusCode).toBe(500);
    });

    test('Debe responder al método GET en /ubi/:id y responder un codigo 200', async () => {
        const response = await request(app).get('/ubi/1');
        expect(response.statusCode).toBe(200);
    });

    test('Debe responder al método GET en /fotos/:id y responder un codigo 200', async () => {
        const response = await request(app).get('/fotos/1');
        expect(response.statusCode).toBe(200);
    });

});