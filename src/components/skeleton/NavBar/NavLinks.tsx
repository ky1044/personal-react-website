import { Row } from "antd";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "src/providers/SiteDataProvider";
import { formatDate } from "src/utils/date";
import DarkModeToggle from "./DarkModeToggle";
import styles from "./NavLinks.module.css";

function NavBarLinks({ expanded }: { expanded: boolean }) {
  const { data, loading } = useSiteData();
  const { latestDeploy } = data;
  const formattedDate = useMemo(() => {
    if (loading) {
      return null;
    }
    const currentTime = new Date();

    if (latestDeploy && latestDeploy > 0) {
      const deployTime = new Date(latestDeploy);
      const timeDiff = +currentTime - +deployTime;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      if (daysDiff <= 0) {
        return "Last updated today";
      } else if (daysDiff === 1) {
        return "Last updated 1 day ago";
      } else {
        return `Last updated ${daysDiff} days ago`;
      }
    } else {
      // fallback if we can't get latestDeploy, show current date
      return formatDate(new Date());
    }
  }, [latestDeploy, loading]);

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
