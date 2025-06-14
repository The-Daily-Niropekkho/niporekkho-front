import { districtTag, divisionTag, upazillaTag } from "@/interface";
import { District, Division, TArgsParam, TResponseRedux, Upazilla } from "@/types";
import { baseApi } from "../../api/baseApi";

const districtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDivisions: builder.query({
      query: () => ({
        url: "/divisions",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<Division[]>) => {
        // Sort divisions by id
        const sortedData = response.data?.sort((a, b) => {
          const idA = typeof a.id === 'string' ? parseInt(a.id, 10) : a.id;
          const idB = typeof b.id === 'string' ? parseInt(b.id, 10) : b.id;
          return idA - idB;
        });
        return {
          data: sortedData,
          meta: response.meta,
        };
      },
      providesTags: [divisionTag],
    }),

    getAllDistricts: builder.query({
      query: (args: { division_id?: string } & TArgsParam) => {
        const params: Record<string, string> = {};
        
        if (args?.division_id) {
          params.division_id = args.division_id;
        }

        // Add other params if needed
        if (args?.limit) {
          params.limit = args.limit.toString();
        }

        return {
          url: "/districts",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<District[]>) => {
        // Sort districts by id
        const sortedData = response.data?.sort((a, b) => {
          const idA = typeof a.id === 'string' ? parseInt(a.id, 10) : a.id;
          const idB = typeof b.id === 'string' ? parseInt(b.id, 10) : b.id;
          return idA - idB;
        });

        return {
          data: sortedData,
          meta: response.meta,
        };
      },
      providesTags: [districtTag],
    }),

    getAllUpazillas: builder.query({
      query: (args: { district_id?: string } & TArgsParam) => {
        const params: Record<string, string> = {};
        
        if (args?.district_id) {
          params.district_id = args.district_id;
        }

        // Add other params if needed
        if (args?.limit) {
          params.limit = args.limit.toString();
        }

        return {
          url: "/upazillas",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<Upazilla[]>) => {
        // Sort upazillas by id
        const sortedData = response.data?.sort((a, b) => {
          const idA = typeof a.id === 'string' ? parseInt(a.id, 10) : a.id;
          const idB = typeof b.id === 'string' ? parseInt(b.id, 10) : b.id;
          return idA - idB;
        });

        return {
          data: sortedData,
          meta: response.meta,
        };
      },
      providesTags: [upazillaTag],
    }),

    getAllUpazillanewsByDistrict: builder.query({
      query: (id) => ({
        url: `/upazillas/${id}`,
        method: "GET",
      }),
    })
  }),
});

export const {
  useGetAllDivisionsQuery,
  useGetAllDistrictsQuery,
  useGetAllUpazillasQuery,
} = districtApi;