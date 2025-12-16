import conversationsApi from '@/api/conversationsApi';
import taskApi from '@/api/taskApi';

export const middlewares = [taskApi.middleware, conversationsApi.middleware];
