import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error));



// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.ActualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    return next();
});

// Agragar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar router
app.use('/', router)

// Definir puerto y host
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => {
    console.log(`El servidor está funcionando`);
});