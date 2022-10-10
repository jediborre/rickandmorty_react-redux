import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

export interface Personaje {
    id: string
    nombre: string
}
interface PersonajeDetail {    
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    image: string,
    location: string
}
type Personajes = Personaje[];

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: retry(
        fetchBaseQuery({ baseUrl: 'https://rickandmortyexpress-production.up.railway.app/' }), { maxRetries: 6 }
    ),
    tagTypes: ['Personajes'],
    endpoints: (builder) => ({
        getPersonajes: builder.query<Personajes, void>({
            query: () => `/api/personajes`,
            providesTags: ['Personajes'],
        }),
        getPersonajeByNombre: builder.query<Personajes, string>({
            query: (nombre) => `/api/personajes?nombre=${encodeURIComponent(nombre)}`,
        }),
        getPersonajeById: builder.query<PersonajeDetail, string>({
            query: (id) => `/api/personajes/${id}`
        }),
    })
});

export const {
    useGetPersonajesQuery,
    useGetPersonajeByIdQuery,
    useGetPersonajeByNombreQuery
} = apiSlice