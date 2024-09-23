import { createSlice } from '@reduxjs/toolkit';
import { dataItem } from './types';

type initialStateType = {
  'list': dataItem[] | [];
  'prevList': dataItem[] | [];
  'initList': dataItem[] | [];
};

const initialState: initialStateType = {
  'list': [],
  'prevList': [],
  'initList': []
};

const uiSlice = createSlice({
  'name': 'ui',
  initialState,
  'reducers': {
    'setCurrentUIlist': ( state, { 'payload': list }) => {
      return { ...state,
        'initList': list,
        list };
    },
    'editCurrentUIlist': (state, { 'payload': { id, property, value } }) => {
      const newList = state.list.map((item) => {
        if (item.id == id) {
          const newItem = { ...item,
            [property]: value };
          return newItem;
        }
        return item;
      });
      const newInitList = state.initList.map((item) => {
        if (item.id == id) {
          const newItem = { ...item,
            [property]: value };
          return newItem;
        }
        return item;
      });
      return { ...state,
        'list': newList,
        'initList': newInitList };
    },
    'resetUIlist': (state) => {
      return { ...state,
        'list': state.initList };
    },
    'updateUIList': ( state, { 'payload': list }) => {
      return { ...state,
        list };
    }
  }
});

export const {
  setCurrentUIlist,
  editCurrentUIlist,
  resetUIlist,
  updateUIList
} = uiSlice.actions;
export default uiSlice.reducer;