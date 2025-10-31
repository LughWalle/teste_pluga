import styles from './style.module.css'
export const AppCard = ({ app, onOpen }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(app)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(app)}
      className={styles.card}
      style={{
        backgroundColor: app.color
      }}
    >
      <img src={app.icon} alt={`${app.name} logo`} className={styles.logo} />
      <div className={styles.name}>
        <h3>{app.name}</h3>
      </div>
    </div>
  );
}
