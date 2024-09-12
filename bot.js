const { Telegraf } = require('telegraf');
const fs = require('fs');
const pdf = require('pdf-parse');  // pdf-parse para analizar el PDF

const bot = new Telegraf('7237090678:AAGylfdDZzYoSr9F0sKsspj3SwenahExsOo');

// Cargar y procesar el PDF
const dataBuffer = fs.readFileSync('pdf/hola.pdf');

pdf(dataBuffer).then(function(data) {
    const textoPDF = data.text;  // Extrae el texto del PDF

    // Configurar el bot para recibir consultas
    bot.start((ctx) => ctx.reply('¡Hola! Envíame una pregunta sobre el archivo PDF.'));
    
    bot.on('text', (ctx) => {
        const consulta = ctx.message.text.toLowerCase();
        const respuesta = buscarEnPDF(textoPDF, consulta);
        ctx.reply(respuesta);
    });

    const buscarEnPDF = (texto, consulta) => {
        const indice = texto.toLowerCase().indexOf(consulta);
        if (indice !== -1) {
            // Devuelve un extracto del texto donde aparece la consulta
            return texto.slice(indice, indice + 300) + '...';
        } else {
            return 'No se encontró la consulta en el documento.';
        }
    };
});

bot.launch();
