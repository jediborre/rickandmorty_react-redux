import React from 'react';
import { motion } from "framer-motion"

export interface PersonajeCardInterface {
	id: string;
	nombre: string;
  click: (pId: string) => void;
}

const PersonajeCard : React.FC<PersonajeCardInterface> = ({id, nombre, click}): JSX.Element => {
	const AVATAR_URL = 'https://rickandmortyapi.com/api/character/avatar/';
	return (
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
		  <div className="bg-white rounded-lg shadow-lg p-4 cursor-pointer" onClick={() => click(id)}>
        <div className="flex justify-center">
          <img
            alt={nombre}
            src={`${AVATAR_URL}${id}.jpeg`}
            className="w-1/2"
            loading="lazy"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {nombre}
          </h2>
        </div>
      </div>
    </motion.div>
	);
};

export default PersonajeCard;
