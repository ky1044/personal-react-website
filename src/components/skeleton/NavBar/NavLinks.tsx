import { Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";
import styles from "./NavLinks.module.css";
import { formatDate } from "src/utils/date";
import { useMemo } from "react";
import { MoonIcon, SunIcon } from "src/icons/Icons";
import DarkModeToggle from "./DarkModeToggle";

function NavBarLinks({ expanded }: { expanded: boolean }) {
  const formattedDate = useMemo(() => formatDate(new Date()), []);

  return (
    <div
      className={`${styles.linksContainer} ${
        expanded ? styles.tall : styles.short
      }`}
    >
      <div
        className={`${styles.topContent} ${
          expanded ? styles.short : styles.tall
        }`}
      >
        <DarkModeToggle />
      </div>

      <Row>
        <Link to="/experience">
          <p className={styles.navLink}>EXPERIENCE</p>
        </Link>
        <div className={styles.divider} />
        <Link to="/about">
          <p className={styles.navLink}>ABOUT</p>
        </Link>
      </Row>
      <div
        className={`${styles.bottomContent} ${
          expanded ? styles.short : styles.tall
        }`}
      >
        <p>{formattedDate}</p>
      </div>
    </div>
  );
}

export default NavBarLinks;
