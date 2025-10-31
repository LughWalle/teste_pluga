import styles from './style.module.css';

export const Skeleton = ({ width, height, circle }) => {
  const styleProp = {
    width,
    height,
    borderRadius: circle ? '50%' : '4px',
  };

  return <div className={styles.skeleton} style={styleProp}></div>;
};
