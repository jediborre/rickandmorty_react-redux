# EJERCICIO PRÁCTICO REACT-REDUX/NODE

Realiza una app con esta api https://rickandmortyapi.com/ la app deberá de contar con los siguientes elementos:  
a) Una barra de búsqueda donde se pueda buscar por nombre de personaje  
b) Deberá de publicarse en github pages.  
c) Deberás de enviar el enlace de tu repositorio con el readme correspondiente para iniciar dicho proyecto.  
d) Deberá de usar webpack como empaquetador.  
e) Deberás usar Redux.  
f) Se deberán de mostrar en cards los resultados de la busqueda.  
g) Al dar click en cada card deberá de mostrar los datos individuales de cada personaje.  
h) Deberá de contener al menos un elemento de animación.  
i) Podrás ocupar un diseño libre.  

![Rick y Morty en React](img/captura1.jpg?raw=true "Rick y Morty en React")  

El proyecto se puede visualizar en  
https://jediborre.github.io/RickandMortyTest/  

Mediante railway.app se hosteo el Backend  
Mediante github pages se hosteo el Front-End  

Se hosteo la parte de Nodejs/Redis en:  
Servidor Node  
rickandmortyexpress-production.up.railway.app  

Servidor redis  
containers-us-west-80.railway.app  

En el repositorio se puede ver dos carpetas:  
client -> Donde se programo la parte de React/Redux  
server -> Donde se programo la parte de Node/Express

Para correr el server ese necesario
```bash
    cd server
npm install
npm run dev
```

Para correr el Cliente
```bash
cd client
npm install
npm start
```  

Particularidades Server  
Básicamente cuando se hace una peticion al server este realiza una copia de la API https://rickandmortyapi.com/api/character
y reduciendola para solo mantener los datos utilizados solamente.
```javascript
//https://rickandmortyexpress-production.up.railway.app/
{
    msj: "Bienvenidos a la API de Rick y Morty.",
    api: "https://rickandmortyapi.com/api/character",
    autor: "Fernando Borrego V.",
    GET: {
        /api/personajes: "Lista de personajes",
        /api/personajes?nombre=nombre: "Lista de personajes filtrados por nombre.",
        /api/personajes/:id: "Detalles de un personaje"
    }
}
//Ej API Personajes
//https://rickandmortyexpress-production.up.railway.app/api/personajes
[{
    id: 1,
    nombre: "Rick Sanchez"
}, {
    id: 2,
    nombre: "Morty Smith"
}, {
    id: 3,
    nombre: "Summer Smith"
}, {
    id: 4,
    nombre: "Beth Smith"
}, {
    id: 5,
    nombre: "Jerry Smith"
}, ...
]
//Ej. Personaje
//https://rickandmortyexpress-production.up.railway.app/api/personajes/1
{
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    location: "Citadel of Ricks"
}
```

