import { FileUp } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormikValues, useFormik } from 'formik';
import { dataItem } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import { resetUIlist, updateUIList } from "@/store/uiSlice";
import { json2csv } from 'json-2-csv';
import { useState } from "react";
import { RootState } from "@/store";

type StatementProps = {
  filters: string[],
  filtersPlaceholder: { [key: string]: string | number },
}

const filtersMap: { [key: string]: string } = {
  id: 'ID',
  barcode: 'Баркод',
  product_brand: 'Бренд',
  product_name: 'Модель',
  product_quantity: 'Количество',
  price: 'Цена',
}

const StatementFilter = ({ filters, filtersPlaceholder }: StatementProps) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const currData = useSelector((state: RootState) => state.ui.initList);
  const currUIList = useSelector((state: RootState) => state.ui.list)
  const dispatch = useDispatch();

  const handleSaveClick = async () => {
    const savedCSVData = json2csv([...currUIList], {
      unwindArrays: true
    });
    const savedJSONData = JSON.stringify(currUIList)
    const newHandle = await window.showSaveFilePicker({
      suggestedName: 'data',
      types: [
        {
          description: "JSON",
          accept: { "application/json": [".json"] },
        },
        {
          description: "Microsoft Excel",
          accept: { "text/csv": [".csv"] },
        },
      ]
    });
    const writableStream = await newHandle.createWritable();
    if (newHandle.name.endsWith('.csv')) {
      await writableStream.write(savedCSVData);
    } else {
      await writableStream.write(savedJSONData);
    }
    await writableStream.close();
  }
  const handleSubmit = (values: FormikValues) => {
    const filterData = Object.entries(values);
    if (filterData.length > 0 && filterData.some((data) => data[1].length > 0)) {
      setIsFiltered(true);
      const filteredData = currData.filter((item: dataItem) => {
        return filterData.every(([key, value]) => item[key].toString().includes(value.trim()))
      });
      dispatch(updateUIList(filteredData));
    }
  }

  const initialValues = filters.reduce((acc: { [key: string]: string }, key) => {
    acc[key] = '';
    return acc
  }, {})
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });
  const handleClearClick = () => {
    setIsFiltered(false);
    dispatch(resetUIlist());
    formik.resetForm({
      values: initialValues,
    });
  }

  return filters.length === 0 ?
    null :
    <form className="mt-7" onSubmit={formik.handleSubmit}>
      <div className="flex flex-wrap gap-2">
        {filters.map((key, index) => (
          <Label key={index} className="flex w-auto gap-2 items-center bg-white p-2 rounded-xl">
            {filtersMap[key]}
            <Input
              name={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
              className="w-auto bg-slate-50" placeholder={filtersPlaceholder[key].toString()}
            />
          </Label>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button type="submit" className="mt-2 p-2 bg-primary rounded-3xl text-white border hover:bg-background hover:border-primary hover:text-primary ease-in duration-100">Сформировать</button>
        <button type="button" onClick={handleSaveClick} className="flex gap-1 items-center mt-2 p-2 bg-secondary rounded-3xl text-white border hover:bg-background hover:border-secondary hover:text-secondary ease-in duration-100">
          <FileUp />
          Экспорт
        </button>
        {isFiltered &&
          <button type="button" onClick={handleClearClick} className="mt-2 p-2 bg-background rounded-3xl text-primary border border-primary hover:bg-primary hover:border-background hover:text-background ease-in duration-100">Сбросить</button>
        }
      </div>
    </form>
};

export default StatementFilter;
