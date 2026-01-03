import { ProjectDetail } from "src/utils/types";
import { TextLink } from "../shared/TextLink";
import ProjectStack from "./ProjectStack";

const ProjectCard = ({ project }: { project: ProjectDetail }) => {
  return (
    <article className="group h-full flex flex-col outline outline-[2px] hover:outline-[3px] outline-content-tertiary hover:outline-content-tertiary-light overflow-hidden bg-[var(--background-primary)] transition-all duration-100 ease-in-out">
      <div className="bg-[rgb(180,180,180)]/70">
        <div className="w-full aspect-[3/2] overflow-hidden">
          <img
            className="w-full h-full object-cover block m-auto"
            src={project.image}
            alt={project.title}
            style={{ width: project?.imageWidth ?? undefined }}
          />
        </div>
      </div>
      <div className="relative flex-1 flex flex-col before:absolute before:top-[-1px] before:left-0 before:right-0 before:h-[2px] before:bg-[var(--content-tertiary)] group-hover:before:h-[3px] group-hover:before:bg-content-tertiary-light before:transition-all before:duration-100 before:ease-in-out before:z-10">
        <div className="grid grid-cols-10 ">
          <div className="col-span-6 md:col-span-7 p-3 border-r border-content-tertiary border-dashed group-hover:border-r-content-tertiary-light transition-all duration-100 ease-in-out">
            <p className="text-xs text-content-secondary">name</p>
            <h2>{project.title}</h2>
          </div>
          <div className="col-span-4 md:col-span-3 p-3">
            <p className="text-xs text-content-secondary ">inception</p>
            <p className="text-lg pt-1">{project.date}</p>
          </div>
        </div>
        <div className="grid grid-cols-10 border-t border-content-tertiary border-dashed flex-1 group-hover:border-content-tertiary-light transition-all duration-100 ease-in-out">
          <div className="col-span-6 md:col-span-7 p-3 border-r border-content-tertiary border-dashed relative group-hover:border-r-content-tertiary-light transition-all duration-100 ease-in-out">
            <p className="text-xs text-content-secondary ">details</p>
            <p className="text-sm mr-12">{project.description}</p>
            <ProjectStack tech={project.tech} />
          </div>
          <div className="col-span-4 md:col-span-3 p-3 flex flex-col justify-between">
            <p className="text-xs text-content-secondary tracking-wide ">
              CTAs
            </p>
            <div className="flex flex-col gap-2 mt-2 items-stretch justify-end ">
              {project.site && (
                <TextLink
                  text="Visit Site"
                  link={project.site}
                  linkType="external"
                />
              )}
              <TextLink
                text="Visit Repo"
                link={project.url}
                linkType="external"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
