import ReactModal from "react-modal";
import styles from "./style.module.css";

export const Modal = ({ isOpen, onRequestClose, app, lastViewed }) => {
  if (!app) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.close} onClick={onRequestClose}>×</button>

      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <img src={app.icon} alt={app.name} className={styles.logo} style={{
            backgroundColor: app.color
          }} />
          <div className={styles.details}>
            <h2>{app.name}</h2>

            <button onClick={() => window.open(app.link, "_blank")} className={styles.button}>
              Acessar
            </button>
          </div>
        </div>

        <div className={styles.lastViewed}>
          <h3>Últimas ferramentas visualizadas</h3>
          <div className={styles.list}>
            {lastViewed?.slice(1, 4).map((tool, i) => (
              <div key={i} className={styles.item}>
                <img src={tool.icon} alt={tool.name} style={{ backgroundColor: tool.color || '#ccc' }} className={styles.itemLogo} />
                <p>{tool.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
