import styles from "./Divider.module.css";

export const Divider = ({ tall = false }: { tall?: boolean }) => (
  <div className={`${styles.divider} ${tall ? styles.tall : ""}`}>
    <div className={styles.mark} />
    <div className={styles.mark} />
    <div className={styles.mark} />
  </div>
);
