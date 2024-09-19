import DataContext from "@/contexts";
import { useContext } from "react";

const Statement = () => {
  const { setCurrData, clearData } = useContext(DataContext);
  return (
    <div>
      <span onClick={setCurrData}>set </span>
      <span onClick={clearData}>clear</span>
    </div>
  )
};

export default Statement;