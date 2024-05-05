import { getQueryUrl } from "../../helpers/api";
import { apiSlice } from "../apiSlice";
import { User, UserAddRequest, UserGetRequest, UserUpdateRequest } from "./model";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        userGet: builder.query<User[] | undefined, UserGetRequest>({
            query: (request) => {
                return getQueryUrl(['users'], {
                    filter: request.filter ? JSON.stringify(request.filter) : undefined,
                    orderBy: request.orderBy ? JSON.stringify(request.orderBy) : undefined,
                    top: request.top
                });
            },
            providesTags: ['Users'],
        }),
        userAdd: builder.mutation<User | null | undefined, UserAddRequest>({
            query: (request) => {
                return {
                    url: getQueryUrl(['users']),
                    method: 'POST',
                    body: request
                }
            },
            invalidatesTags: ["Users"]
        }),
        userUpdate: builder.mutation<User | null | undefined, UserUpdateRequest>({
            query: (request) => ({
                url: getQueryUrl(['users']),
                method: 'PATCH',
                body: request
            }),
            invalidatesTags: ["Users"]
        }),
        userDelete: builder.mutation<boolean, number>({
            query: (userId) => ({
                url: getQueryUrl(['users', userId.toString()]),
                method: 'DELETE',   
            }),
            invalidatesTags: ["Users"]
        })
    })
});

export const { 
    useUserGetQuery,
    useLazyUserGetQuery,
    useUserAddMutation,
    useUserUpdateMutation,
    useUserDeleteMutation,
} = userApiSlice