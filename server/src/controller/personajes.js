const axios = require('axios');
const redisClient = require('../redis');
const env = require('dotenv').config().parsed;

const REDIS_ALL_PERSONAJES_KEY = 'all_personajess';
const REDIS_PERSONAJE_KEY = 'personajes_';

const process_personaje_api = data => {
    return (data && data.error) ? {
        error: 'No se encontró el personaje.'
    } : {
        id: data.id,
        name: data.name,
        status: data.status,
        species: data.species,
        type: data.type,
        image: data.image,
        location: data.location.name
    };
}
const process_personajes_api = data => {
    let personajes = [];
    if (data && data.results) {
        data.results.forEach(personaje => {
            personajes.push({
                id: personaje.id,
                nombre: personaje.name,
                //image: personaje.image
                // status: personaje.status,
                // genero: personaje.gender,
                // especie: personaje.species,
            });
        });
    }
    return personajes;
};
const personajes = {
    getAllPersonajes: async () => {
        try {
            const personajes_from_cache = await redisClient.get(REDIS_ALL_PERSONAJES_KEY);
            if (personajes_from_cache)
                return JSON.parse(personajes_from_cache);
            
            let all_personajes = [];
            const num_of_pages = 42;
            for (let page = 1; page <= num_of_pages; page++) {
                const api_url = `${env.API_URL}?page=${page}`;
                const api_data = await axios.get(api_url);
                all_personajes.push(...process_personajes_api(api_data.data));
            }
            await redisClient.set(
                REDIS_ALL_PERSONAJES_KEY,
                JSON.stringify(all_personajes), {
                  EX: env.DATA_EXPIRATION,
                }
            );
            return all_personajes;
        }
        catch (err) {
            throw err;
        }
    },
    getPeronsajeById: async id => {
        try {
            const personaje_from_cache = await redisClient.get(REDIS_PERSONAJE_KEY + id);
            if (personaje_from_cache)
                return JSON.parse(personaje_from_cache);
            
            const api_url = `${env.API_URL}/${id}`;
            const api_data = await axios.get(api_url);
            const personaje = process_personaje_api(api_data.data);
            if (personaje.error)
                return personaje;
            
            await redisClient.set(
                REDIS_PERSONAJE_KEY + id,
                JSON.stringify(personaje), {
                  EX: env.DATA_EXPIRATION,
                }
            );
            return personaje;
        }
        catch (err) {
            throw err;
        }
    },
    filterPersonajeByName: async (nombre) => {
        try {
            if (nombre.length < 3)
                return [];
            const all_personajes = await personajes.getAllPersonajes();
            return all_personajes.filter(personaje =>
                personaje.nombre.toLowerCase().includes(nombre.toLowerCase()
            ));
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = personajes;