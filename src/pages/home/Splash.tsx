import { Row } from "antd";
import { useEffect, useState } from "react";
import HeroImage from "./HeroImage";
import styles from "./Splash.module.css";
import useScroll from "src/hooks/useScroll";

const Splash = () => {
  const [hightlightActive, setHighlightActive] = useState(false);
  const scrollHeight = useScroll();

  useEffect(() => {
    const element = document.getElementById("splash-header-text");
    const elementPosition = element?.getBoundingClientRect();

    if ((elementPosition?.bottom ?? 0) <= window.innerHeight) {
      setHighlightActive(true);
    } else if ((elementPosition?.bottom ?? 0) > window.innerHeight + 75) {
      setHighlightActive(false);
    }
  }, [scrollHeight]);

  return (
    <>
      <div
        className={`top-level-container ${styles.heroWrapper} ${
          scrollHeight > 5 ? styles.activeGradient : ""
        }`}
      >
        <Row justify="space-between" align-items="baseline">
          <h1 className={styles.hero}>KEN</h1>
          <h1 className={styles.hero} style={{ textAlign: "end" }}>
            SOFTWARE
          </h1>
        </Row>
        <Row justify="space-between" align-items="baseline">
          <h1 className={styles.hero}>YOKOKAWA</h1>
          <h1 className={styles.hero} style={{ textAlign: "end" }}>
            DEV
          </h1>
        </Row>
      </div>
      <HeroImage scrollHeight={scrollHeight} />
      <div className="top-level-container">
        <div className={styles.headerWrapper}>
          <p className={styles.headerText} id="splash-header-text">
            approaching <br />
            <span className="blue">software development</span>
            <br />
            with{" "}
            <span className="blue" style={{ position: "relative" }}>
              people
              <div
                className={`${styles.highlight} ${
                  hightlightActive ? styles.highlightActive : ""
                }`}
              />
            </span>{" "}
            in mind
          </p>
        </div>
      </div>
    </>
  );
};

export default Splash;
