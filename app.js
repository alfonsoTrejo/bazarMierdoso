const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

// Ruta de inicio
app.get('/datos', (req, res) => {
    try {
        let datos = fs.readFileSync('./datos.json', 'utf8');
        datos = JSON.parse(datos); // Convertir el contenido a un objeto JSON
        res.send(datos);
    } catch (error) {
        console.error('Error al leer el archivo de datos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para manejar la solicitud POST desde el formulario
app.post('/datos', (req, res) => {
    try {
        console.log(req.body);
        const { nombre, cantidad } = req.body; // Obtener los datos enviados desde el formulario

        // Crear el nuevo objeto JSON
        const newData = {
            nombre,
            cantidad: parseInt(cantidad) // Convertir a número si es necesario
        };

        let datos = fs.readFileSync('./datos.json', 'utf8');
        datos = JSON.parse(datos); // Convertir el contenido a un objeto JSON

        // Agregar los nuevos datos al objeto existente
        datos.push(newData);

        // Guardar los datos actualizados en el archivo JSON
        fs.writeFileSync('./datos.json', JSON.stringify(datos, null, 2), 'utf8');

        res.json({ status: 1 });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
