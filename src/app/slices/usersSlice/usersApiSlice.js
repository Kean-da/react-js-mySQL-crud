import { apiSlice } from "../apiSlice";
const USERS_URL     = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (data) => ({
                url:        `${USERS_URL}/login`,
                method:     'POST',
                body:       data,
            }),
        }),

        logout: build.mutation({
            query: () => ({
                url:        `${USERS_URL}/logout`,
                method:     'POST',
            }),
        }),

        register: build.mutation({
            query: (data) => ({
                url:        `${USERS_URL}/register`,
                method:     'POST',
                body:       data,
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;