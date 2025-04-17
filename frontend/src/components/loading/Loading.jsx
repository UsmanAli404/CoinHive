import styles from './loading.module.css'

function Loading() {
  return (
    <div className={styles.dotLoadingContainer}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
}

export default Loading;
