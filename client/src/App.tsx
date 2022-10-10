import './App.css';
import banner from './img/banner.jpg';
import { useState} from 'react';
import { useGetPersonajesQuery, useGetPersonajeByNombreQuery } from './app/api';
// import { useState, useEffect } from 'react';
// import { useGetPersonajesQuery } from './app/api';
import SearchBar from './components/SearchBar/SearchBar';
import PersonajeCard from './components/PersonajeCard/PersonajeCard';
import PersonajeLoadingCard from './components/PersonajeLoadingCard/PersonajeLoadingCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const {data: personajesAll, isLoading, isSuccess} = useGetPersonajesQuery()
  const {data: personajeByNombre} = useGetPersonajeByNombreQuery(searchTerm)
  
  let contenidoPersonajes;
  if (isLoading) {
    let ncards = 12
    contenidoPersonajes =
    <>
      {[...Array(ncards)].map((x, n) =>
        (<PersonajeLoadingCard key={n} />)
      )}
    </>
  }
  else if (isSuccess) {
    if (searchTerm && personajeByNombre) {
      contenidoPersonajes =
        <>
          {personajeByNombre.map((personaje) => (
            <PersonajeCard key={personaje.id} id={personaje.id} nombre={personaje.nombre} />
          ))}
        </>
    }
    else {
      if (!personajesAll)
        contenidoPersonajes =
          <div className="mt-14 text-center text-xl dark:text-white">
            No hay personajes
          </div>
      else
        contenidoPersonajes =
          <>
            {personajesAll.map((personaje) => (
              <PersonajeCard key={personaje.id} id={personaje.id} nombre={personaje.nombre} />
            ))}
          </>
    }
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">.
        <div className="pb-4 flex justify-center">
          <img src={banner} alt="Rick y Morty" className="w-1/2" />
        </div>
        <SearchBar onSearchTerm={(nombre) => {setSearchTerm(nombre); }} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {contenidoPersonajes}
        </div>
      </div>
    </>
  );
}

export default App;
