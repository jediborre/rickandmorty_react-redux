import React from 'react';
export interface PersonajeCardInterface {
	id: string;
	nombre: string;
}

const PersonajeCard : React.FC<PersonajeCardInterface> = ({id, nombre}): JSX.Element => {
	const AVATAR_URL = 'https://rickandmortyapi.com/api/character/avatar/';
	return (
		<div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-center">
        <img
          src={`${AVATAR_URL}${id}.jpeg`}
          alt={nombre}
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
	);
};

export default PersonajeCard;
