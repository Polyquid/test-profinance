import DataContext from "@/contexts";
import { BookText, CalendarDays, CircleUserRound } from "lucide-react";
import { useContext } from "react";

const Header = () => {
  const { data } = useContext(DataContext);
  return (
    <>
      <div className="flex py-1 items-center justify-between w-3/4 bg-white rounded-xl">
        <div className="flex items-center">
          <div className="flex gap-2 ml-8">
            <CircleUserRound className="text-secondary" />
            <p>Иванов И.И.</p>
          </div>
          <div className="flex py-5 px-4 gap-2 ml-8 text-primary bg-primary-foreground rounded-xl">
            <CalendarDays />
            <p>Тариф до 15.04.2024</p>
          </div>
        </div>
        <div className="flex gap-3 mr-6">
          <button className="px-3 py-2 text-secondary border-secondary border-2 bg-white rounded-full hover:text-background hover:bg-secondary ease-in duration-100">Выйти</button>
          <button className="px-2 text-white bg-accent rounded-full border-2 hover:text-accent hover:bg-white hover:border-accent ease-in duration-100">О нас →</button>
        </div>
      </div>
      <div className="flex justify-between items-center w-8/12 mt-14">
        <h2 className="text-secondary text-3xl">{data.length === 0 ? 'Остатки не сформированы' : 'Остатки сформированы на 01.04.2023'}</h2>
        <button className="flex border-2 gap-2 p-2 bg-secondary text-white rounded-full hover:text-secondary hover:bg-white hover:border-secondary ease-in duration-100">
          <BookText />
          Инструкции
        </button>
      </div>
    </>
  )
};

export default Header;
