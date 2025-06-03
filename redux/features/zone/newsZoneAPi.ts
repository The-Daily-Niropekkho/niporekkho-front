// src/redux/features/zone/newsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders: (headers) => {
      // Add authorization if needed
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getZoneNews: builder.query({
      query: (params) => ({
        url: "api/v1/news",
        params: {
          division_id: params.division_id,
          district_id: params.district_id,
          upazilla_id: params.upazilla_id,
          // Add other optional params
          created_by_id: params.created_by_id,
          media_type: params.media_type,
          country_id: params.country_id
        },
      }),
    }),
  }),
});

export const { useGetZoneNewsQuery } = newsApi;