const request = require('supertest');
const express = require('express');
const routes = require('../routes/contenidoRoutes')

const app = express()
app.use(express.json());
app.use('/', routes);

/**
 * @David_Trujillo
 */


describe('Test para los metodos get', ()=>{
    test('Debe responder al método GET en / y responder un codigo 200', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('Debe responder al método GET en /:id y responder un codigo 200 y success true', async () => {
        const response = await request(app).get('/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true)
    });

    test('Debe responder al método GET en /:id y responder un codigo 500 y success false', async () => {
        const response = await request(app).get('/0');
        expect(response.statusCode).toBe(500);
    });

    test('Debe responder al método GET en /plazas/:id y responder un codigo 404 y success false', async () => {
        const response = await request(app).get('/plazas/0');
        expect(response.statusCode).toBe(404);
    });

})