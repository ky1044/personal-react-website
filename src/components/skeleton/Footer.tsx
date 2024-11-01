import { Col, Row } from "antd";
import { useMemo } from "react";
import styles from "./Footer.module.css";
import PrintersColorBlocks from "./PrintersColorBlocks";

export function Footer() {
  const year = useMemo(() => {
    const today = new Date();
    return today.getFullYear();
  }, []);

  return (
    <>
      <div id="nav-bar" className={`${styles.footer}`}>
        <Row
          justify="end"
          align-items="baseline"
          align="middle"
          style={{
            padding: "12px 0 24px",
            margin: "0 auto",
            maxWidth: 1200,
          }}
        >
          <Col>
            <p className={styles.name}>Ken Yokokawa {year}</p>
            <PrintersColorBlocks />
          </Col>
        </Row>
      </div>
    </>
  );
}
