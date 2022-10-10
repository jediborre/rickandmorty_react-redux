import {useState} from 'react';
import banner from '../img/banner.jpg';
import { motion, AnimatePresence } from "framer-motion"
import SearchBar from '../components/SearchBar/SearchBar';
import PersonajeCard from '../components/PersonajeCard/PersonajeCard';
import PersonajeDetalle from '../components/PersonajeDetalle/PersonajeDetalle';
import PersonajeLoadingCard from '../components/PersonajeLoadingCard/PersonajeLoadingCard';
import {
	useGetPersonajesQuery,
	useGetPersonajeByIdQuery,
	useGetPersonajeByNombreQuery
} from '../app/api';

export interface PersonajesInterface {}

const Personajes : React.FC<PersonajesInterface> = () => {
	let noHayPesonajes: boolean = false;
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedId, setSelectedId] = useState('')

  	const {data: personajesAll, isLoading, isSuccess} = useGetPersonajesQuery();
  	const {data: personajeByNombre} = useGetPersonajeByNombreQuery(searchTerm);
	const {data: personajeById} = useGetPersonajeByIdQuery(selectedId);
  
  	let tarjetas;
  	if (isLoading) {
    	let preloadCards = 12
    	tarjetas =
			<>
				{[...Array(preloadCards)].map((x, n) =>
					(<PersonajeLoadingCard key={n} />)
				)}
			</>
  	}
  	else if (isSuccess) {
    	if (searchTerm && personajeByNombre) {
			if (personajeByNombre.length === 0) {
				noHayPesonajes = true;
			}
			else {
				tarjetas =
					<>
						{personajeByNombre.map((personaje) => (
							<PersonajeCard key={personaje.id} id={personaje.id} nombre={personaje.nombre} click={(pId) => setSelectedId(pId)} />
						))}
					</>
			}
    	}
		else {
			tarjetas =
				<>
					{personajesAll.map((personaje) => (
						<PersonajeCard key={personaje.id} id={personaje.id} nombre={personaje.nombre} click={(pId) => setSelectedId(pId)} />
					))}
				</>
    	}
  	}
	return (
		<div className="container mx-auto px-4 h-full">
        	<div className="pb-4 flex justify-center">
          		<img src={banner} alt="Rick y Morty" className="w-1/2" />
        	</div>
        	<SearchBar onSearchTerm={(nombre) => {setSearchTerm(nombre); }} />
            {
				noHayPesonajes && (
					<div className="mt-20 text-center text-3xl dark:text-white">
						<motion.div
							initial={{ opacity: 0 }}
        					whileInView={{ opacity: 1 }}
        					viewport={{ once: true }}
						>
							No hay personajes para mostrar.
						</motion.div>
					</div>
				)
			}
			{	
			<AnimatePresence>
				{selectedId && personajeById && (
					<PersonajeDetalle
						id={selectedId}
						name={personajeById.name}
						species={personajeById.species}
						status={personajeById.status}
						location={personajeById.location}
						image={personajeById.image}
						onclick={(lID) => setSelectedId('')}
					/>
				)}
			</AnimatePresence>
			}
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{tarjetas}
			</div>
      	</div>
	);
};

export default Personajes;
