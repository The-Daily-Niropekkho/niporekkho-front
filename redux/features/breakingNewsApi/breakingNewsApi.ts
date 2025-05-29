import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "@/types";
import { BreakingNews } from "@/types/breakingNews";

const breakingNewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBreakingNews: builder.query<
      {
        data: BreakingNews[];
        meta?: { page: number; limit: number; total: number };
      },
      void
    >({
      query: () => ({
        url: "/breaking-news?sortBy=updatedAt&sortOrder=desc&limit=500",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<BreakingNews[]>) => {
        return { data: response.data || [], meta: response.meta };
      },
      transformErrorResponse: (error) => {
        return error;
      },
    }),
  }),
});

export const { useGetBreakingNewsQuery } = breakingNewsApi;
