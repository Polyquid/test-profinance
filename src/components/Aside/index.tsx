import { MessageCircleMore } from 'lucide-react';
import AsideNav from './AsideNav';
import AsideInfo from './AsideInfo';

const Aside = () => {
  return (
    <div className="flex flex-col w-1/4 mx-4 gap-1">
      <AsideNav />
      <AsideInfo />
      <button className="flex justify-center items-center gap-1 w-80 h-16 bg-primary rounded-3xl text-white font-semibold hover:bg-background hover:border-primary hover:text-primary hover:border ease-in duration-100">
        <MessageCircleMore />
        Связаться с нами
      </button>
    </div>
  );
};

export default Aside;
