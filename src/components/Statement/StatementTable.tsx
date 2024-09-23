import { dataItem } from '@/store/types';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { MouseEventHandler, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUIlist } from '@/store/uiSlice';
import StatementInput from './StatementInput';
import { RootState } from '@/store';

type StatementProps = {
  'headers': string[];
};

export type Editable = {
  'cell': {
    'id'?: string;
    'property'?: string;
    'value'?: string;
  };
  'state': boolean;
};

const filtersMap: { [key: string]: string } = {
  'id': 'ID',
  'barcode': 'Баркод',
  'product_brand': 'Бренд',
  'product_name': 'Модель',
  'product_quantity': 'Количество',
  'price': 'Цена'
};
const initEditableState: Editable = {
  'cell': {
    'id': '',
    'property': '',
    'value': ''
  },
  'state': false
};

const StatementTable = ({ headers }: StatementProps) => {
  const data = useSelector((state: RootState) => state.ui.list);
  const dispatch = useDispatch();
  const [typeSort, setTypeSort] = useState({ 'asc': false,
    'property': '' });
  const [editable, setEditable] = useState(initEditableState);

  const renderCell = (item: dataItem) => {
    const data = Object.entries(item);
    return data.map(([key, value], index) => {
      const currCN = cn({
        'rounded-l-xl': index === 0,
        'rounded-r-xl': index === data.length - 1
      });
      const isEditable = editable.state && editable.cell.id === item.id?.toString() && editable.cell.property === key;
      return isEditable ? 
        <StatementInput setEditable={setEditable} editable={editable} />
        :
        <TableCell
          className={currCN}
          data-property={key}
        >
          {value}
        </TableCell>;
    });
  };
  const sortBy = (name: string) => {
    const asc = name === typeSort.property ? !typeSort.asc : false;
    const listCopy = [...data];
    listCopy.sort((a, b) => {
      if (typeof a[name] === 'string') {
        const aNormalized = a[name].toLowerCase().trim();
        const bNormalized = b[name].toLowerCase().trim();
        if (asc) {
          return aNormalized > bNormalized ? 1 : -1;
        }
        return aNormalized < bNormalized ? 1 : -1;
      } else {
        if (asc) {
          return a[name] > b[name] ? 1 : -1;
        }
        return a[name] < b[name] ? 1 : -1;
      }
    });
    dispatch(setCurrentUIlist(listCopy));
    setTypeSort({
      asc,
      'property': name
    });
  };
  const { totalSum, totalCount } = data.reduce((acc: { [key: string]: number }, item: dataItem) => {
    const { price, product_quantity } = item;
    if (typeof price === 'number' && typeof product_quantity === 'number') {
      acc.totalSum += price;
      acc.totalCount += product_quantity;
      return acc;
    }
    return acc;
  }, { 'totalSum': 0,
    'totalCount': 0 });

  const handleDoubleClick: MouseEventHandler<HTMLTableSectionElement> = (e) => {
    if (e.target instanceof HTMLElement && !editable.state) {
      const row = e.target.closest('[data-id]') as HTMLElement;
      const value = e.target.textContent ?? '';
      const { id } = row.dataset;
      const { property } = e.target.dataset;
      setEditable({ 'cell': { id,
        property,
        value },
      'state': true });
    }
  };
  return data.length === 0 ?
    null :
    <div className="mt-4 p-3 bg-white rounded-xl border h-96 overflow-y-scroll overflow-x-auto">
      <Table className="scroll-m-80">
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => 
              <TableHead key={index} onClick={() => {
                sortBy(header); 
              }} className="cursor-pointer">
                <div className="flex flex-row items-center justify-between">
                  {filtersMap[header]}
                  <ChevronDown size={16} className={cn('text-primary', { 'rotate-180': typeSort.property === header && !typeSort.asc })} />
                </div>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody onDoubleClick={handleDoubleClick}>
          {data.map((item: dataItem, index: number) => {
            const cells = renderCell(item);
            return (
              <TableRow key={item.id} data-id={item.id} className={cn(index % 2 === 0 ? 'bg-background' : 'bg-slate-50')}>
                {cells}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow className="text-primary bg-primary-foreground">
            <TableCell colSpan={headers.length - 2}>Итого</TableCell>
            <TableCell>{totalCount}</TableCell>
            <TableCell>{totalSum}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>;
};

export default StatementTable;
