import uiSlice from './uiSlice';
import listDataSlice from './listDataSlice';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    ui: uiSlice,
    listData: listDataSlice,
  },
});