import styles from './style.module.css'
import lupaIcon from '../../assets/searchIcon.svg'

export const SearchBar = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <img src={lupaIcon} alt="Buscar" className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar ferramenta"
        className={styles.input}
      />
    </div>
  );
};
