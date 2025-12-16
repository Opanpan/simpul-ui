import { baseQueryWithInterceptors, RTKQueryConfig } from '@/lib/utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { CONVERSATIONS_URL, INBOX_URL, MESSAGES_URL } from './url';

const conversationsApi = createApi({
  reducerPath: 'conversationsApi',
  baseQuery: baseQueryWithInterceptors,
  ...RTKQueryConfig,
  endpoints: (builder) => ({
    getInbox: builder.query({
      query: ({ id, search }) => ({
        url: CONVERSATIONS_URL + INBOX_URL + `/${id}`,
        method: 'GET',
        params: { search },
      }),
    }),
    getMessage: builder.query({
      query: ({ id }) => ({
        url: CONVERSATIONS_URL + `/${id}` + MESSAGES_URL,
        method: 'GET',
      }),
    }),
    postMessage: builder.mutation({
      query: (payload) => ({
        url: MESSAGES_URL + `/${payload.id}`,
        method: 'POST',
        body: payload.body,
      }),
    }),
    putMessage: builder.mutation({
      query: (payload) => ({
        url: MESSAGES_URL + `/${payload.id}`,
        method: 'PUT',
        body: payload.body,
      }),
    }),
    deleteMessage: builder.mutation({
      query: ({ id }) => ({
        url: MESSAGES_URL + `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLazyGetInboxQuery,
  useLazyGetMessageQuery,
  usePostMessageMutation,
  usePutMessageMutation,
  useDeleteMessageMutation,
} = conversationsApi;
export default conversationsApi;
