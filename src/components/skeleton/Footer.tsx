import { Row } from "antd";
import { useMemo } from "react";
import styles from "./Footer.module.css";

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
            padding: "12px 0 ",
            margin: "0 auto",
            maxWidth: 1200,
          }}
        >
          <p className="grey">Ken Yokokawa {year}</p>
        </Row>
      </div>
    </>
  );
}
