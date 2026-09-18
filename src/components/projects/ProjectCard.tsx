import { ProjectDetail } from "src/utils/types";
import { TextLink } from "../shared/TextLink";
import ProjectStack from "./ProjectStack";

/* The card body is one grid rather than two stacked ones, so that the right
   column can size to its own content (`auto`) while still lining its dashed
   rule up across both rows.

   That column has a hard minimum: "October, 2020" and "Visit Repo ↗" are both
   ~120px and neither may wrap or clip. A fractional column could not honour
   that — at anything under ~1100px of card width the arrow was being cut off. */

const CELL =
  "p-3 border-content-tertiary border-dashed group-hover:border-content-tertiary-light transition-all duration-instant ease-in-out";

const ProjectCard = ({ project }: { project: ProjectDetail }) => {
  return (
    <article className="group h-full flex flex-col outline outline-[2px] hover:outline-[3px] outline-content-tertiary hover:outline-content-tertiary-light overflow-hidden bg-background-primary transition-all duration-instant ease-in-out">
      <div className="bg-background-secondary/70">
        <div className="w-full aspect-[3/2] overflow-hidden">
          <img
            className="w-full h-full object-cover block m-auto"
            src={project.image}
            alt={project.title}
            style={{ width: project?.imageWidth ?? undefined }}
          />
        </div>
      </div>

      <div className="relative flex-1 grid grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_1fr] before:absolute before:top-[-1px] before:left-0 before:right-0 before:h-[2px] before:bg-content-tertiary group-hover:before:h-[3px] group-hover:before:bg-content-tertiary-light before:transition-all before:duration-instant before:ease-in-out before:z-2">
        {/* name */}
        <div className={`${CELL} border-r min-w-0`}>
          <p className="text-xs text-content-secondary">name</p>
          <h2 className="break-words">{project.title}</h2>
        </div>

        {/* inception */}
        <div className={CELL}>
          <p className="text-xs text-content-secondary">inception</p>
          <p className="text-lg pt-1 whitespace-nowrap">{project.date}</p>
        </div>

        {/* details */}
        <div className={`${CELL} border-t border-r relative min-w-0`}>
          <p className="text-xs text-content-secondary">details</p>
          {/* Right margin only reserves room for the stack drawer, which is
              itself md-and-up. On phones the copy gets the full width back. */}
          <p className="text-sm md:mr-12">{project.description}</p>
          <ProjectStack tech={project.tech} />
        </div>

        {/* CTAs */}
        <div className={`${CELL} border-t flex flex-col justify-between`}>
          <p className="text-xs text-content-secondary tracking-wide">CTAs</p>
          <div className="flex flex-col gap-2 mt-2 items-stretch justify-end">
            {project.site && (
              <TextLink
                text="Visit Site"
                link={project.site}
                linkType="external"
              />
            )}
            <TextLink text="Visit Repo" link={project.url} linkType="external" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
