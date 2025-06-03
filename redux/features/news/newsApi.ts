import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { NewsDetails } from "@/types/newsDetails";

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: ({
        limit,
        category_id,
      }: {
        limit?: number;
        category_id?: string;
      }) => ({
        url: `/news?limit=${limit}&category_id=${category_id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<NewsDetails[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getLatestNews: builder.query({
      query: ({ limit = 20 }: { limit?: number }) => ({
        url: `/news/get-latest-news?fields=banner_image&sortBy=createdAt&sortOrder=desc&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<NewsDetails[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    getNewsBySlug: builder.query({
      query: (slug: string) => ({
        url: `/news/${slug}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<NewsDetails>) => {
        return response.data;
      },
    }),

    updateNews: builder.mutation({
      query: (data) => ({
        url: `/news`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["news"],
    }),

    tropicwiseNews: builder.query({
      query: ({ limit, topic_id }: { limit?: number; topic_id?: string }) => ({
        url: `/news?&topic_id=${topic_id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<NewsDetails[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),

    zonewiseNews: builder.query({
      query: ({
        limit,
        division_id,
        district_id,
        upazilla_id,
      }: {
        limit?: number;
        division_id?: string;
        district_id?: string;
        upazilla_id?: string;
      }) => {
        const params = new URLSearchParams();
        if (division_id) params.append("division_id", division_id);
        if (district_id) params.append("district_id", district_id);
        if (upazilla_id) params.append("upazilla_id", upazilla_id);
        if (limit) params.append("limit", limit.toString());

        return {
          url: `/news?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<NewsDetails[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetLatestNewsQuery,
  useGetNewsBySlugQuery,
  useUpdateNewsMutation,
  useTropicwiseNewsQuery,
  useZonewiseNewsQuery
} = newsApi;
