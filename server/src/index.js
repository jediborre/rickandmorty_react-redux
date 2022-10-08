const express = require('express');
const axios = require('axios');
const { createClient } = require('redis');
const responseTime = require('response-time');

const env = require('dotenv').config().parsed;
const port = Number(env.NODE_PORT);

const redisClient = createClient({
    url: `redis://${env.REDIS_USER}:${env.REDIS_PASSWORD}@${env.REDIS_HOST}:${env.REDIS_PORT}`
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error ' + err);
});


function logErrors(err, req, res, next) {
    console.error(err.stack);
    if (req.xhr)
        res.status(500).send({error: 'Servidor fallo!'});
    else
        next(err);
}

const app = express();

app.use(responseTime(function (req, res, time) {
    console.log(req.url, req.method, time, 'ms');
}));
app.use(logErrors);

// Rutas
const index = require('./routes/index');
const personajes = require('./routes/personajes');

app.use(index);
app.use('/api', personajes);
app.get('*', function(req, res){
    res.status(404).send({msj: '404 | Página no encontrada.'});
});

async function main() {
    await redisClient.connect();
    app.listen(port, () => { 
        console.log(`Rick y Morty Server API | Puerto '${port}'`);
    });
}
main();