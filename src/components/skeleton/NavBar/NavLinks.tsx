import { Row } from "antd";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSiteData } from "src/providers/SiteDataProvider";
import { formatDate } from "src/utils/date";
import DarkModeToggle from "./DarkModeToggle";

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
    } else return null;
  }, [latestDeploy, loading]);

  return (
    <div className="flex flex-col justify-center items-end gap-3">
      <div
        className={`flex flex-row items-center gap-2 overflow-hidden transition-all ${
          expanded ? "h-[22px]" : "h-0"
        }`}
      >
        <DarkModeToggle />
      </div>

      <Row>
        <Link to="/experience">
          <p className="text-content-primary text-[20px] font-medium">
            EXPERIENCE
          </p>
        </Link>
        <div className="border-r-[1px] border-content-tertiary my-[6px] mx-2" />
        <Link to="/about">
          <p className="text-content-primary text-[20px] font-medium">ABOUT</p>
        </Link>
      </Row>
      <div
        className={`opacity-0 transition-all duration-300 ${
          formattedDate ? "opacity-100" : ""
        } ${expanded ? "h-[22px]" : "h-0"}`}
      >
        <p className="text-sm">{formattedDate}</p>
      </div>
    </div>
  );
}

export default NavBarLinks;
