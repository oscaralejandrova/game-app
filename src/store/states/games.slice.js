import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gamesApi = createApi({
    reducerPath: 'gamesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
    endpoints: (builder) => ({
        getGames: builder.query({
            query: () => 'games/',
        }),
    }),
})

export const { useGetGamesQuery } = gamesApi;


export default gamesApi.reducer;










