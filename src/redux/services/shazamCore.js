import { createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"


    export const shazamCoreApi= createApi({
        reducerPath: "shazamCoreApi",
        baseQuery: fetchBaseQuery({
            baseUrl:"https://shazam-core.p.rapidapi.com/v1",
            prepareHeaders: (headers) => {
                headers.set("X-RapidAPI-Key" , "26c77ef464mshaa852e39c1fde6ep1c618ajsn78fc4acad16c");

                return headers;
            },
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({ query: () => "/charts/world" })
        })
    })

    export const {useGetTopChartsQuery} = shazamCoreApi;