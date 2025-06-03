import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { ICategory } from "@/types/news";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({ sortBy = "position,position_update_at", sortOrder = "asc", limit = 500, is_news = true, status = "active" }: { sortBy?: string; sortOrder?: string; limit?: number, is_news?: boolean, status?: string }) => ({
        url: `/category?sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}&is_news=${is_news}&status=${status}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<ICategory[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/category`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} = categoryApi;

