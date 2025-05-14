import { Col, Row } from "antd";
import { useMemo } from "react";
import styles from "./Footer.module.css";
import PrintersColorBlocks from "./PrintersColorBlocks";
import DotsSection from "src/pages/home/DotsSection";

export function Footer() {
  const year = useMemo(() => {
    const today = new Date();
    return today.getFullYear();
  }, []);

  return (
    <>
      <div id="nav-bar" className={`${styles.footer}`}>
        <div>
          <DotsSection />
        </div>
        <div className={styles.footerBlock}>
          <div className={styles.footerRow}>
            <div className={styles.footerContent}>
              <p className={styles.name}>Ken Yokokawa {year}</p>
              <PrintersColorBlocks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
