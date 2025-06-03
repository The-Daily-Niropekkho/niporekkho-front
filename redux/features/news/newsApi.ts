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
        url: `/news/get-latest-news?sortBy=createdAt&sortOrder=desc&limit=${limit}`,
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

    searchNews: builder.query({
      query: ({ keyword, offset }: { keyword: string; offset: number }) => {
        const limit = 500; // Fetch 500 items at a time (we'll display 10 at a time)
        const url = `/news?searchTerm=${encodeURIComponent(
          keyword.replace(/%20/g, " "),
        )}&limit=${limit}&offset=${offset}`;
        console.log("Constructed URL:", url);
        return {
          url,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<NewsDetails[]>) => {
        console.log("API Response:", response);
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["news"],
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.keyword}-${queryArgs.offset}`;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
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
  useSearchNewsQuery,
} = newsApi;
