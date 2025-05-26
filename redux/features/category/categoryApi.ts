import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { ICategory } from "@/types/news";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // check category slug existence
    checkSlug: builder.query({
      query: (slug) => ({
        url: `/category/check-slug?slug=${slug}`,
        method: "GET",
      }),
    }),
    getAllCategories: builder.query({
      query: ({ sortBy, sortOrder, limit,is_news }: { sortBy: string; sortOrder: string; limit: number, is_news?: boolean }) => ({
        url: `/category?sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}&is_news=${is_news}`,
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
  useCheckSlugQuery,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} = categoryApi;

