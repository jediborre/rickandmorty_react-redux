import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import banner from './img/banner.jpg';
import { useGetPersonajesQuery } from './app/api';

function App() {
  const {
      data: personajes,
      isLoading,
      isSuccess
  } = useGetPersonajesQuery()

  let contenidoPersonajes;
  if (isLoading) {
    contenidoPersonajes = <div className="mt-14 text-center text-xl dark:text-white">Cargando...</div>
  }
  else if (isSuccess) {
    if (!personajes)
      contenidoPersonajes = <div>No hay personajes</div>
    else
      contenidoPersonajes =
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {personajes.map((personaje) => (
            <div key={personaje.id} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-center">
                <img
                  src={`https://rickandmortyapi.com/api/character/avatar/${personaje.id}.jpeg`}
                  alt={personaje.nombre}
                  className="w-1/2"
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold">
                  {personaje.nombre}
                </h2>
              </div>
            </div>
          ))}
        </div>
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">.
        <div className="pb-4 flex justify-center">
          <img src={banner} alt="Rick y Morty" className="w-1/2" />
        </div>
        <SearchBar />
        <div>
          {contenidoPersonajes}
        </div>
      </div>
    </>
  );
}

export default App;
