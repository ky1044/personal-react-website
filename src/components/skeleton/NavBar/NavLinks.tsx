import { Row } from "antd";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSiteData } from "src/providers/SiteDataProvider";
import DarkModeToggle from "./DarkModeToggle";

const Corners = ({ isActive }: { isActive: boolean }) => {
  const cornerBaseClass =
    "pointer-events-none absolute h-3 w-3 border-primary-blue transition-all duration-200 opacity-0 group-hover:opacity-100";
  return (
    <>
      <span
        className={`${cornerBaseClass}  border-t-2 border-l-2 rounded-tl-[0px]  ${
          isActive ? "opacity-100 top-0 left-0" : "top-2 left-2"
        } group-hover:top-0 group-hover:left-0`}
      />
      <span
        className={`${cornerBaseClass} border-t-2 border-r-2 rounded-tr-[0px]  ${
          isActive ? "opacity-100 top-0 right-0" : "top-2 right-2"
        } group-hover:top-0 group-hover:right-0`}
      />
      <span
        className={`${cornerBaseClass} border-b-2 border-l-2 rounded-bl-[0px]  ${
          isActive ? "opacity-100 bottom-0 left-0" : "bottom-2 left-2"
        } group-hover:bottom-0 group-hover:left-0`}
      />
      <span
        className={`${cornerBaseClass} border-b-2 border-r-2 rounded-br-[0px]  ${
          isActive ? "opacity-100 bottom-0 right-0" : "bottom-2 right-2"
        } group-hover:bottom-0 group-hover:right-0`}
      />
    </>
  );
};

function NavBarLinks({ expanded }: { expanded: boolean }) {
  const { data, loading } = useSiteData();
  const { latestDeploy } = data;
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState<"experience" | "about" | null>(
    null
  );

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
        <Link
          to="/experience"
          className="relative inline-block group px-2 py-1"
          aria-current={
            location.pathname.startsWith("/experience") ? "page" : undefined
          }
          onMouseEnter={() => setHoveredLink("experience")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Corners
            isActive={
              location.pathname.startsWith("/experience") &&
              hoveredLink !== "about"
            }
          />
          <p className="text-content-primary text-[20px] font-medium">
            EXPERIENCE
          </p>
        </Link>
        <div className=" mx-2" />
        <Link
          to="/about"
          className="relative inline-block group px-2 py-1"
          aria-current={
            location.pathname.startsWith("/about") ? "page" : undefined
          }
          onMouseEnter={() => setHoveredLink("about")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Corners
            isActive={
              location.pathname.startsWith("/about") &&
              hoveredLink !== "experience"
            }
          />
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
