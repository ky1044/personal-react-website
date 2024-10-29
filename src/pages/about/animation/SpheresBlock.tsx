import React from "react";
import styles from "./SpheresBlock.module.css";

const SpheresBlock = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <div className={styles.sphere1}></div>
      <div className={styles.sphere2}></div>
    </div>
  );
};

export default SpheresBlock;
