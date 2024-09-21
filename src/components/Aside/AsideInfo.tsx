import { Separator } from "../ui/separator";

type linkItem = {
  id: number,
  title: string,
  href: string,
};

const AsideInfo = () => {
  const linksData: linkItem[] = [
    { id: 1, title: 'Пользовательское соглашение', href: '#'},
    { id: 2, title: 'Политика конфиденциальности', href: '#'},
    { id: 3, title: 'Юридическая информация', href: '#'},
    { id: 4, title: 'Публичная оферта', href: '#'},
  ]
  return (
    <div className="w-80 px-6 py-6 flex flex-col justify-center items-start rounded-3xl bg-secondary text-white">
      <h2 className="text-sm mb-8">Техническая поддержка</h2>
      <div className="w-full flex gap-8 mb-5">
        <div className="">
          <h3 className="text-[0.7rem] text-muted">Номер поддержки:</h3>
          <a href="" className="text-sm">8 (999) 999 99 99</a>
        </div>
        <div className="">
          <h3 className="text-[0.7rem] text-muted">Почта поддержки:</h3>
          <a href="" className="text-sm">pf1@werthesest.ru</a>
        </div>
      </div>
      <h3 className="text-[0.7rem] text-muted">Часы работы:</h3>
      <div className="flex gap-4 mb-5">
        <p className="text-sm">Пн - Пт</p>
        <p className="text-sm">c 9:00 до 19:00 мск</p>
      </div>
      {linksData.map(({ title, href, id }, index) => (
        <div key={id}>
          <a href={href} className="text-muted text-sm">{title}</a>
          {index !== linksData.length - 1 ? <Separator className="my-2 bg-muted" /> : null}
        </div>
      ))}
    </div>
  )
};

export default AsideInfo;
