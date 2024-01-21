import { Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import useScroll from "src/hooks/useScroll";
import Logo from "./Logo";

export function NavBar() {
  const scrollHeight = useScroll();

  const isNavBarExpanded = scrollHeight < 30;

  return (
    <>
      <div className={styles.navBarContainer}>
        <Row
          justify="space-between"
          align-items="baseline"
          align="middle"
          style={{
            transition: "0.2s ease",
            height: isNavBarExpanded ? 130 : 61,
            margin: "0 auto",
            maxWidth: 1200,
          }}
        >
          <Logo expanded={isNavBarExpanded} />

          <Col>
            <Row>
              <Link to="/experience">
                <p className={styles.navLink}>EXPERIENCE</p>
              </Link>
              <Divider
                type="vertical"
                orientation="center"
                style={{
                  marginTop: "8px",
                  height: "16px",
                  backgroundColor: "black",
                }}
              />
              <Link to="/about">
                <p className={styles.navLink}>ABOUT</p>
              </Link>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ height: 130 }}></div>
    </>
  );
}
