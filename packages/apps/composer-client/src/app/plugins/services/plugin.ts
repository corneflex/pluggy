import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pluginsApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http;//localhost:4200/' }),
  endpoints: (builder) => ({
    getPlugins: builder.query<string[], void>({
      query: () => `http://localhost:3333/plugins/`,
    }),
  }),
})

export const { useGetPluginsQuery } = pluginsApi