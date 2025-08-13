import { useState } from "react";
import TechTag from "../shared/TechTag";

function ProjectStack({ tech }: { tech: string[] }) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div
      className="hidden md:block absolute top-1/2 -translate-y-1/2 select-none"
      onMouseLeave={() => setExpanded(false)}
      style={{ width: "calc(100% - 12px)", height: "96px" }}
    >
      <div className="relative h-full w-[calc(100%-48px)] ml-auto mr-4 rounded-[16px] overflow-hidden flex justify-end">
        <div
          className="absolute right-0 top-0 h-full bg-background-tertiary rounded-[16px] overflow-hidden pr-11 flex items-start"
          style={{
            transform: `translateX(${isExpanded ? 0 : 100}%)`,
            transformOrigin: "left center",
            transition: "transform 300ms",
          }}
        >
          <div className="px-2 py-2 w-full">
            <div className="flex flex-wrap gap-1 items-start content-start">
              {tech.map((t) => (
                <TechTag name={t} key={t} size="sm" hasGlow={true} />
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute right-0 top-0 w-8 h-full bg-background-tertiary rounded-[16px] flex items-center justify-center cursor-default"
          onMouseEnter={() => setExpanded(true)}
        >
          <span className="text-xs text-content-primary rotate-90">stack</span>
        </div>
      </div>
    </div>
  );
}
export default ProjectStack;
