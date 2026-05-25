import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import { taskApi } from './apis/taskApi';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});
