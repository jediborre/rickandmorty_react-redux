
const validator = require('validator');
const querystring = require('querystring');
const url = require('url');
const router = require('express').Router();
const personajes_controller = require('../controller/personajes');


router.get('/personajes', async (req, res, next) => {
    try {
        const queryObject = url.parse(req.url, true).query;
        let nombre;
        let hay_nombre = queryObject.nombre;
        if (hay_nombre)
            if (validator.isAscii(hay_nombre))
                nombre = validator.escape(hay_nombre);
            else
                hay_nombre = false;
        if (hay_nombre)
            res.status(200).send(await personajes_controller.filterPersonajeByName(nombre));
        else
            res.status(200).send(await personajes_controller.getAllPersonajes());
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msj: err.message});
    }
});
router.get('/personajes/:id', async (req, res, next) => {
    try {     
        res.status(200).send(await personajes_controller.getPeronsajeById(req.params.id));
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msj: err.message});
    }
});
module.exports = router;