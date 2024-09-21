import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [] };

const listData = createSlice({
  name: 'listData',
  initialState,
  reducers: {
    setCurrentData: ( _, { payload: data }) => ({ data }),
  },
});

export const {
  setCurrentData
} = listData.actions;
export default listData.reducer;