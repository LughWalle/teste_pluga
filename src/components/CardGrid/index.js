import { AppCard } from '../AppCard';
import style from './style.module.css'
import { Skeleton } from '../Skeleton'

export const CardGrid = ({ items, onOpen, loading }) => {
  if (loading) {
    return (
      <div className={style.grid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={style.skeletonCard}>
            <Skeleton width="60px" height="60px" circle />
            <Skeleton width="80%" height="16px" />
          </div>
        ))}
      </div>
    )
  }
  return (
    
    <div className={style.grid}>
      {items.map(item => <AppCard key={item.id || item.name} app={item} onOpen={onOpen} />)}
    </div>
  );
}
