import uiSlice from './uiSlice';
import listDataSlice from './listDataSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    ui: uiSlice,
    listData: listDataSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
