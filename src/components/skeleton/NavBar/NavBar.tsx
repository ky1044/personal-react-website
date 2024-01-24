import { Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import useScroll from "src/hooks/useScroll";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

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
            overflow: "hidden",
          }}
        >
          <Logo expanded={isNavBarExpanded} />
          <NavLinks expanded={isNavBarExpanded} />
        </Row>
      </div>
      <div style={{ height: 130 }}></div>
    </>
  );
}
