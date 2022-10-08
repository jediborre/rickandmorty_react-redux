const router = require('express').Router();
const env = require('dotenv').config().parsed;

router.get('/', async (req, res, next) => {
    res.status(200).send({
        msj: 'Bienvenidos a la API de Rick y Morty.',
        api: env.API_URL,
        autor: 'Fernando Borrego V.',
        GET: {
            '/api/personajes': 'Lista de personajes',
            '/api/personajes?nombre=nombre': 'Lista de personajes filtrados por nombre.',
            '/api/personajes/:id': 'Detalles de un personaje',
        }
    });
});
module.exports = router;