import { type ConfigureStoreOptions } from '@reduxjs/toolkit';
import { baseApi } from 'shared/api/index';

export const rootReducer: ConfigureStoreOptions['reducer'] = {
  [baseApi.reducerPath]: baseApi.reducer
};
