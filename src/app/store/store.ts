import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer.ts';
import { baseApi } from 'shared/api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Optionally disable serializable check
    }).concat(baseApi.middleware) // Add your custom middleware here
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
