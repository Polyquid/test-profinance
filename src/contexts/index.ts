import { createContext } from 'react';

type dataItem = { id: number; barcode: number; product_brand: string; product_name: string; product_quantity: number; price: number; };
type initContext = {
  data: (dataItem | never)[];
  setCurrData: () => void;
  clearData: () => void;
}
const init: initContext = {
  data: [],
  setCurrData: () => {},
  clearData: () => {},
}
const DataContext = createContext(init);

export default DataContext;