import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { NewsUtils } from "@/types/newsUtils";



const newsUtilsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopReadNews: builder.query({
      query: ({ limit = 20 }: { limit?: number }) => ({
        url: `/news-utils/top-read-news?fields=banner_image&sortBy=total_view&sortOrder=desc&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<NewsUtils[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
  }),
});

export const { useGetTopReadNewsQuery } = newsUtilsApi;
