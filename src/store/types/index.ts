export type dataItem = {
  [key: string]: any;
  id?: number;
  barcode?: number;
  product_brand?: string;
  product_name?: string;
  product_quantity?: number;
  price?: number;
};

export type initContext = {
  data: dataItem[] | [];
  setBaseData: () => void;
  clearData: () => void;
  setFilteredData: (data: dataItem[]) => void;
  getData: () => dataItem[] | [];
}