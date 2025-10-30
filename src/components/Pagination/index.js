export const Pagination = ({ page, totalPages, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>Anterior</button>
      <span>{page} / {totalPages}</span>
      <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Próximo</button>
    </div>
  );
}
