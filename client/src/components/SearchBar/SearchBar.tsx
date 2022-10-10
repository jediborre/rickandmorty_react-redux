import React from 'react';
import {DebounceInput} from 'react-debounce-input';

export interface SearchBarInterface {
	onSearchTerm: (term: string) => void;
}

const SearchBar : React.FC<SearchBarInterface> = ({onSearchTerm}): JSX.Element => {
	return (
		<>
			<form className="flex items-center">   
				<label
					htmlFor="busqueda"
					className="sr-only">
					Buscar
				</label>
				<div className="relative w-full">
					<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							className="w-7 h-7 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clipRule="evenodd" />
						</svg>
					</div>
					<DebounceInput
						id="busqueda"
						minLength={3}
						debounceTimeout={500}
				  		className="bg-gray-50 border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-14 p-2.5  
									dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				  		placeholder="Busqueda"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onSearchTerm(e.target.value); }}
						autoComplete="off"
					/>
				</div>
			</form>
		</>
	);
};

export default SearchBar;
