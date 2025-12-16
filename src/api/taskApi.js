import { baseQueryWithInterceptors, RTKQueryConfig } from '@/lib/utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { TASK_URL } from './url';

const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQueryWithInterceptors,
  ...RTKQueryConfig,
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (params) => ({
        url: TASK_URL,
        method: 'GET',
        params: params,
      }),
    }),

    addTask: builder.mutation({
      query: (payload) => ({
        url: TASK_URL,
        method: 'POST',
        body: payload.body,
      }),
    }),

    updateTask: builder.mutation({
      query: ({ id, body }) => ({
        url: `${TASK_URL}/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
export default taskApi;
