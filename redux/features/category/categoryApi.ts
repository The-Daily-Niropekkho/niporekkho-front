import { TResponseRedux, Category } from "@/types";
import { baseApi } from "../../api/baseApi";

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
      query: ({ sortBy, sortOrder, limit }: { sortBy: string; sortOrder: string; limit: number }) => ({
        url: `/category?sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<Category[]>) => {
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

