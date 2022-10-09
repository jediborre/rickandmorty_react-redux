import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

export interface Personaje {
    id: string
    nombre: string
}
type PostsResponse = Personaje[]

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: retry(
        fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), { maxRetries: 6 }
    ),
    tagTypes: ['Personajes'],
    endpoints: (build) => ({
        getPersonajes: build.query<PostsResponse, void>({
            query: () => '/api/personajes',
            providesTags: ['Personajes']
        }),
    })
})

export const {
    useGetPersonajesQuery
} = apiSlice