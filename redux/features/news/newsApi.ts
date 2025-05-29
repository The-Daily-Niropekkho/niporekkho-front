import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { NewsDetails } from "@/types/newsDetails";

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: ({ limit, category_id }: { limit?: number; category_id?: string }) => ({
        url: `/news?limit=${limit}&category_id=${category_id}`,
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
  }),
});

export const {
  useGetAllNewsQuery,
  useGetNewsBySlugQuery,
  useUpdateNewsMutation,
} = newsApi;
