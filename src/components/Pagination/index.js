import styles from './style.module.css'
export const Pagination = ({ page, totalPages, onChange }) => {
  return (
    <div className={styles.pagination}>
      <button className={styles.button} onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>Anterior</button>
      <span>{page} / {totalPages}</span>
      <button className={styles.button} onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Próximo</button>
    </div>
  )
}
