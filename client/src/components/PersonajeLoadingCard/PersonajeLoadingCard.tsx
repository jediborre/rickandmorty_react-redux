import React from 'react';
import ContentLoader from "react-content-loader"

export interface PersonajeLoadingCardInterface {
}

const PersonajeLoadingCard : React.FC<PersonajeLoadingCardInterface> = (): JSX.Element => {
	return (
		<div className="bg-white rounded-lg shadow-lg p-4">
			<div className="flex justify-center">
				<ContentLoader
					speed={2}
					width={300}
					height={170}
					viewBox="0 0 400 200"
					backgroundColor="#f3f3f3"
					foregroundColor="#dfdfdf"
				>
					<rect x="110" y="0" rx="0" ry="0" width="180" height="160" />
					<rect x="25" y="180" rx="0" ry="0" width="350" height="25" />
				</ContentLoader>
			</div>
			<div className="text-center">
				
			</div>
		</div>
	);
};

export default PersonajeLoadingCard;
