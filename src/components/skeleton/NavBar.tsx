import { Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

export function NavBar() {
  return (
    <>
      <div className={styles.navBarContainer}>
        <Row
          justify="space-between"
          align-items="baseline"
          align="middle"
          style={{
            padding: "12px 0 ",
            margin: "0 auto",
            maxWidth: 1200,
          }}
        >
          <header>
            <Link to="/">
              <h1 className="logo">Ken Y</h1>
            </Link>
          </header>

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
      <div style={{ height: 70 }}></div>
    </>
  );
}
