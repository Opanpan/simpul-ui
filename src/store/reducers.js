import conversationsApi from '@/api/conversationsApi';
import taskApi from '@/api/taskApi';

export const reducers = {
  [taskApi.reducerPath]: taskApi.reducer,
  [conversationsApi.reducerPath]: conversationsApi.reducer,
};
