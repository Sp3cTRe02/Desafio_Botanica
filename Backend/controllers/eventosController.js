const eventoConexion = require('../database/eventosConexion')
const { StatusCodes } = require('http-status-codes')
const { Readable } = require('stream')
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode')
const PDFDocument = require('pdfkit')


class eventoController {
    static crearEvento = async (req, res) => {
        try {

        } catch (error) {

        }

    }

    static getEventos = async (req, res) => {
        try {
            const eventos = await eventoConexion.getEventos()

            for (let i = 0; i < eventos.length; i++) {
                const id = eventos[i].dataValues.id
                const imagen = process.env.URL_PETICION + process.env.PORT + "/api/eventos/upload/" + id
                eventos[i].dataValues.imagen = imagen
            }

            const response = {
                success: true,
                data: {
                    eventos
                }
            }

            res.status(StatusCodes.OK).json(response)


        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static getInfoEvento = async (req, res) => {
        try {
            const id = req.params.id
            const evento = await eventoConexion.getInfoEvento(id)

            const imagen = process.env.URL_PETICION + process.env.PORT + "/api/eventos/upload/" + id
            evento.imagen = imagen

            const response = {
                success: true,
                data: {
                    evento
                }
            }

            res.status(StatusCodes.OK).json(response)

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static getOrganizador = async (req, res) => {

        try {
            const id = req.params.id
            const organizador = await eventoConexion.getOrganizador(id)

            const response = {
                success: true,
                data: {
                    organizador
                }
            }

            res.status(StatusCodes.OK).json(response)

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el organizador.', sqlMessage: error })
        }
    }

    static getPlazasRestantes = async (req, res) => {
        try {
            const id = req.params.id
            const plazasTotales = await eventoConexion.getTotalPlazas(id)
            const plazasOcupadas = await eventoConexion.getPlazasOcupadas(id)

            console.log(plazasTotales)
            console.log(plazasOcupadas)

            const plazasRestantes = plazasTotales.dataValues.cantidadMax - plazasOcupadas

            const response = {
                success: true,
                data: {
                    plazasRestantes
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor', sqlMessage: error })
        }

    }
    


    static mostrarImagen = async (req, res) => {
        try {
            const imagen = await eventoConexion.getImagen(req.params.id);
            console.log(imagen.dataValues.imagen)

            if (imagen) {
                const pathImagen = path.join(__dirname, '../uploads', 'imgs/content', imagen.dataValues.imagen);
                console.log(pathImagen);

                if (fs.existsSync(pathImagen)) {
                    return res.sendFile(pathImagen);
                }
            }

            res.status(StatusCodes.NOT_FOUND).json({ error: "No se ha encontrado la imagen" });
        } catch (error) {
            console.error('Error al mostrar la imagen:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error interno del servidor" });
        }
    }

    static generarQR = async (ticketInfo, options = {}) => {
        const defaultOptions = {
            type: 'png',
            quality: 0.92,
            size: 500
        };

        const finalOptions = { ...defaultOptions, ...options };

        const text = JSON.stringify(ticketInfo);

        try {
            return await QRCode.toBuffer(text, finalOptions);
        } catch (err) {
            console.error("Error al generar el QR code:", err);
            throw err;
        }
    }

    static generarPDF = async (tickets, qrImages) => {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();

            const chunks = [];
            let pdfBuffer;

            doc.on('data', (chunk) => {
                chunks.push(chunk);
            });

            doc.on('end', () => {
                pdfBuffer = Buffer.concat(chunks);
                resolve(pdfBuffer);
            });

            tickets.forEach((ticket, index) => {
                doc.fontSize(20).text(`Detalles del billete ${index + 1}:`, { align: 'center' });
                doc.fontSize(14).text(`Número de billete: ${ticket.ticketNumber}`);
                doc.text(`Salida: ${ticket.departure}`);
                doc.text(`Destino: ${ticket.destination}`);
                doc.text(`Fecha: ${ticket.date}`);

                doc.moveDown();
                doc.fontSize(20).text(`Código QR del billete ${index + 1}:`, { align: 'center' });
                doc.image(qrImages[index], { fit: [250, 250], align: 'center' });

                if (index !== tickets.length - 1) {
                    doc.addPage();
                }
            });

            doc.end();
        });
    }


    static descargarPDF = async (req, res) => {
        try {
            const tickets = [
                {
                    ticketNumber: "ABC456",
                    departure: "New York",
                    destination: "Los Angeles",
                    date: "2024-03-01",

                },
                {
                    ticketNumber: "DEF456",
                    departure: "Los Angeles",
                    destination: "San Francisco",
                    date: "2024-03-02",

                }
            ];

            // Generar códigos QR para los billetes
            const qrImages = await Promise.all(tickets.map((ticket) => this.generarQR(ticket, { size: 300 })));

            // Generar el PDF con los detalles de los billetes
            const pdfBuffer = await this.generarPDF(tickets, qrImages);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=ticket-details.pdf');
            const pdfStream = new Readable();
            pdfStream.push(pdfBuffer);
            pdfStream.push(null);
            pdfStream.pipe(res);

            console.log(res)

        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Error al generar el PDF");
        }
    };

}

module.exports = eventoController