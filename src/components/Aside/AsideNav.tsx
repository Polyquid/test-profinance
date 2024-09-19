import { BookText, ChartGantt, FilePenLine, LucideProps, Settings, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type navDataItem = {
  id: number,
  title: string;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  content: string;
}

const AsideNav = () => {
  const navData: Array<navDataItem> = [
    { id: 1, title: 'Настройки', Icon: Settings, content: 'Lorem Ipsum' },
    { id: 2, title: 'Внесение данных', Icon: FilePenLine, content: 'Lorem Ipsum' },
    { id: 3, title: 'Отчеты', Icon: ChartGantt, content: 'Lorem Ipsum' },
    { id: 4, title: 'База знаний', Icon: BookText, content: 'Lorem Ipsum' },
  ];
  return (
    <div className="w-80 flex flex-col justify-center items-center rounded-3xl bg-secondary text-white">
      <div className="w-64 flex justify-between items-center my-5">
        <h2 className="font-semibold">
          <span className="bg-primary rounded-md px-1">ФИН</span>
          {' Контроль'}
        </h2>
        <p className="flex px-3 py-1 gap-1 justify-between bg-secondary-foreground rounded-full text-xs text-muted">
          Меню
          <button>
            <X size={15}/>
          </button>
        </p>
      </div>
      <Accordion type="single" collapsible className="w-72 flex flex-col gap-1 pb-4">
        {navData.map(({ id, title, Icon, content }) => {
          return (
            <AccordionItem value={`item-${id}`} className='bg-secondary-foreground rounded-xl'>
              <AccordionTrigger className='px-4'>
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  {title}
                </div>
              </AccordionTrigger>
              <AccordionContent className='px-3'>
                {content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default AsideNav;
