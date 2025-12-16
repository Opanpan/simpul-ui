import { configureStore } from '@reduxjs/toolkit';
import { middlewares } from './middlewares';
import { reducers } from './reducers';

const store = configureStore({
  devTools: true,
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
});

export default store;
