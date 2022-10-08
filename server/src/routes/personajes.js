const axios = require('axios');
const router = require('express').Router();
const redisClient = require('../redis');
const env = require('dotenv').config().parsed;

router.get('/personajes', async (req, res, next) => {
    try {
        const personaje = await redisClient.get("personajes");
        if (personaje)
            return res.status(200).send(JSON.parse(personaje));

        const api_response = await axios.get(env.API_URL);
        await redisClient.set(
            "personajes",
            JSON.stringify(api_response.data), {
              EX: env.DATA_EXPIRATION,
            }
        );
        res.status(200).send(api_response.data);
    }
    catch (err) {
        res.status(500).send({ msj: err.message});
    }
});
module.exports = router;