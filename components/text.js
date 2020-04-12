import styles from './text.module.css';

const Text = ({bottom, from, children}) => (
  <div style={{display: 'flex'}}>
    <p className={`${styles.text} ${bottom ? styles.bottom : ''} ${styles[from]}`}>{children}</p>
  </div>
);

export default Text;
