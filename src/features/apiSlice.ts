import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import _ from "lodash";
import { getAuthorization } from "../helpers/api";

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
        const token = getAuthorization();
        if (token) {
            headers.set('authorization', `${token}`)
        }
        return headers;
    }
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithRetry,
    endpoints: () => ({}),
    tagTypes: [
        "Profile",
        "Users",
        "Catalog",
        "Media",
        "Friends",
        "Rooms",
        "Room",
        "Watched",
        "Planned",
        "Favourites"
    ],
});

