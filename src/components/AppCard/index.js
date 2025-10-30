import styles from './style.module.css'
export const AppCard = ({ app, onOpen }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(app)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(app)}
      className={styles.card}
    >
      <img src={app.icon} alt={`${app.name} logo`} style={{ height: 48, objectFit: 'contain' }} />
      <h3 style={{ margin: 0, fontSize: 14 }}>{app.name}</h3>
      <p style={{ margin: 0, fontSize: 12, color: '#555' }}>{app.summary || app.description}</p>
    </div>
  );
}
