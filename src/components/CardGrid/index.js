import { AppCard } from '../AppCard';
import style from './style.module.css'

export const CardGrid = ({ items, onOpen }) => {
  if (!items.length) return <div>Nenhum resultado</div>;
  return (
    <div className={style.grid}>
      {items.map(item => <AppCard key={item.id || item.name} app={item} onOpen={onOpen} />)}
    </div>
  );
}
