import { Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

export function NavBar() {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset >= offsetTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    const element = document.getElementById("nav-bar") as HTMLElement;
    const offsetTop = element?.offsetTop - 20;
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div
        id="nav-bar"
        className={`${styles.navBarContainer} ${isSticky ? styles.sticky : ""}`}
      >
        <Row
          justify="space-between"
          align-items="baseline"
          align="bottom"
          style={{
            borderBottom: ".5px lightgrey solid",
            marginTop: 18,
            marginBottom: 12,
            backgroundColor: "dodgerblue",
          }}
        >
          <header>
            <Link to="/">
              <h1 className="logo">Ken Yokokawa</h1>
            </Link>
          </header>

          <Col>
            <Row>
              <Link to="/resume">
                <h2 className="white">Resume</h2>
              </Link>

              <Divider
                type="vertical"
                orientation="center"
                style={{ marginTop: "8px", height: "16px" }}
              />
              <Link to="/about">
                <h2 className="white">About</h2>
              </Link>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ height: isSticky ? 70 : 0 }}></div>
    </>
  );
}
