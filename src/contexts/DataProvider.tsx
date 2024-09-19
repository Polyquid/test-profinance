import { useState, ReactNode } from 'react'
import rawData from '../assets/DATA.json'
import DataContext from './index.ts';

type dataItem = { id: number; barcode: number; product_brand: string; product_name: string; product_quantity: number; price: number; };

const DataProvider = ({ children }: { children: ReactNode }) => {
  const initialData: dataItem[] = []
  const [data, setData] = useState(initialData);
  const setCurrData = () => setData(rawData);
  const clearData = () => setData(initialData);
  return (
    <DataContext.Provider value={{data, setCurrData, clearData}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
