const express = require('express');
const responseTime = require('response-time');
const redisClient = require('./redis');
const cors = require('cors');


const env = require('dotenv').config().parsed;
const port = Number(env.NODE_PORT);

const app = express();

app.use(cors());
app.use(responseTime((req, res, time) =>{
    console.log(req.url, req.method, time, 'ms');
}));

// Rutas
const index = require('./routes/index');
const personajes = require('./routes/personajes');

app.use(index);
app.use('/api', personajes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (req.xhr)
        res.status(500).send({
            msj: '500 | Fallo Servidor!',
            error: err.message
        });
    else
        next(err);
});
app.get('*', function(req, res){
    res.status(404).send({
        url: req.url,
        msj: `404 | Recurso no encontrado.`
    });
});

async function main() {
    await redisClient.connect();
    app.listen(port, () => { 
        console.log(`API Rick y Morty | Puerto '${port}'`);
    });
}
main();