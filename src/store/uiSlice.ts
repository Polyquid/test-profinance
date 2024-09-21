import { createSlice } from '@reduxjs/toolkit';
import { dataItem } from './types';

type initialStateType = {
  list: dataItem[] | [],
  isEmpty: boolean | null,
}

const initialState: initialStateType = {
  list: [],
  isEmpty: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentUIlist: ( _, { payload: list }) => {
      if (list.length > 0) {
        return { list, isEmpty: false };
      } else {
        return { list, isEmpty: true }
      }
    },
  },
});

export const {
  setCurrentUIlist,
} = uiSlice.actions;
export default uiSlice.reducer;