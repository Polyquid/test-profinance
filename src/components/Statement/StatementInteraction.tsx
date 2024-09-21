import { useDispatch } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { FolderInput, FolderUp, X } from "lucide-react";
import rawData from '@/assets/DATA.json'
import { setCurrentData } from "@/store/listDataSlice";
import { setCurrentUIlist } from "@/store/uiSlice";

const StatementInteraction = () => {
  const dispatch = useDispatch();
  const handleSetDataClick = () => {
    dispatch(setCurrentData(rawData))
    dispatch(setCurrentUIlist(rawData))
  }
  const handleClearDataClick = () => {
    dispatch(setCurrentData([]))
    dispatch(setCurrentUIlist([]))
  }
  return (
    <div className="mt-7">
      <Separator />
      <div className="flex justify-between my-3">
        <button onClick={handleSetDataClick} className="flex items-center gap-1">
          <FolderInput size={16} />
          Загрузить данные из CSV
        </button>
        <button className="flex items-center gap-1">
          <FolderUp size={16} />
          Изменить данные
        </button>
        <button onClick={handleClearDataClick} className="flex items-center gap-1">
          <Separator orientation="vertical" className="mr-12" />
          Очистить
          <X size={16} />
        </button>
      </div>
      <Separator />
    </div>
  )
};

export default StatementInteraction;
