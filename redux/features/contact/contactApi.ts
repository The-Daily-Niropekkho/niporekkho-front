import { Contact } from "@/types/contact";
import { baseApi } from "../../api/baseApi";
import { TResponseRedux } from "@/types";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "/contact-settings?status=active",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<Contact[]>) => {
        return { data: response.data, meta: response.meta };
      },
    }),
  }),
});

export const { useGetContactsQuery } = contactApi;

