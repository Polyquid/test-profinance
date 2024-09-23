import { useDispatch } from "react-redux";
import { Input } from "../ui/input";
import { useState } from "react";
import { editCurrentUIlist } from "@/store/uiSlice";
import { Editable } from "./StatementTable"
import { Check, X } from "lucide-react";

type StatementInputType = {
  setEditable: React.Dispatch<React.SetStateAction<Editable>>,
  editable: Editable
}

const numberFields = ['id', 'barcode', 'product_quantity', 'price'];
const numbers = '1234567890'.split('');
const isNumber = (value: string): boolean => {
  const valueChar = value.split('');
  return valueChar.every((char: string) => numbers.includes(char));
};

const StatementInput = ({ setEditable, editable }: StatementInputType) => {
  const [value, setValue] = useState(editable.cell.value);
  const dispath = useDispatch();
  const handleSetValueClick = () => {
    const { cell: { id, property }} = editable
    if (numberFields.includes(property || '') ) {
      if (isNumber(value || '')) {
        dispath(editCurrentUIlist({ id, property, value }));
        setEditable({ ...editable, state: false});
      } else {
        alert('Только числа');
      }
    } else {
      dispath(editCurrentUIlist({ id, property, value }));
      setEditable({ ...editable, state: false});
    }
  }
  const handleClearClick = () => {
    setEditable({ ...editable, state: false})
  }
  return (
    <td className="flex items-center p-4 relative">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === 'NumpadEnter' || e.code === 'Enter') {
            handleSetValueClick();
          }
          if (e.code === 'Escape') {
            handleClearClick();
          }
        }}
        className="p-0 h-5 bg-blue-400"
        autoFocus
      />
      <Check onClick={handleSetValueClick} className="absolute -bottom-3 left-10 mx-1 text-white bg-primary rounded-full cursor-pointer"/>
      <X onClick={handleClearClick} className="absolute -bottom-3 left-3 mx-1 text-white bg-secondary rounded-full cursor-pointer" />
    </td>
  )
};

export default StatementInput;
