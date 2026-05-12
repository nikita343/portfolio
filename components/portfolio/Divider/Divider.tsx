import { memo } from "react";
import styles from "./Divider.module.css";

const DividerImpl = ({ tall = false }: { tall?: boolean }) => (
  <div className={`${styles.divider} ${tall ? styles.tall : ""}`}>
    <div className={styles.mark} />
    <div className={styles.mark} />
    <div className={styles.mark} />
  </div>
);

export const Divider = memo(DividerImpl);
