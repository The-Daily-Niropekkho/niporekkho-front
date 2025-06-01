import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { HomeData, HomeNews } from "@/types/homeData"; // Import HomeData and HomeNews

const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoint for multiple category data
    getMultipleCategoryData: builder.query({
      query: ({ categoryIds }: { categoryIds: string[] }) => {
        const query = new URLSearchParams();
        categoryIds.forEach((id) => query.append("categoryIds", id));
        return {
          url: `/home-data/get-multiple-category-data?${query.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: TResponseRedux<Record<string, HomeData[]>>,
      ) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["homeData"],
    }),
    // New endpoint for top home data
    getTopHomeData: builder.query({
      query: () => ({
        url: `/home-data/get-top-home-data`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<HomeData[]>) => {
        // Extract the `news` field from each HomeData object
        const newsItems = response.data ? response.data.map((item: HomeData) => item.news) : [];
        return {
          data: newsItems, 
          meta: response.meta,
        };
      },
      providesTags: ["topHomeData"],
    }),
  }),
});

export const { useGetMultipleCategoryDataQuery, useGetTopHomeDataQuery } =
  homeApi;
