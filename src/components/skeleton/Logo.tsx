import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo({ expanded }: { expanded: boolean }) {
  return (
    <header>
      <Link to="/">
        <h1
          className={`${styles.logo} ${
            expanded ? styles.tall : styles.wide
          }`}
        >
          <div className={styles.logoTopRow}>
            <div
              className={`${styles.logoText} ${
                expanded ? styles.expand : styles.shrink
              }`}
            >
              Ken{" "}
            </div>
            <div>Y</div>
          </div>
          <div>Yoko</div>
          <div>kawa</div>
        </h1>
      </Link>
    </header>
  );
}

export default Logo;
