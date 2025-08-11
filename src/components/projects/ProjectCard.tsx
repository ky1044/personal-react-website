import { ProjectDetail } from "src/utils/types";
import { TextLink } from "../shared/TextLink";
import ProjectStack from "./ProjectStack";

const ProjectCard = ({ project }: { project: ProjectDetail }) => {
  return (
    <article className="h-full flex flex-col border border-[2px] border-content-tertiary overflow-hidden bg-[var(--background-primary)]">
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
      <div className="border-t border-t-[2px] border-content-tertiary flex-1 flex flex-col">
        <div className="grid grid-cols-10 ">
          <div className="col-span-6 md:col-span-7 p-3 border-r border-content-tertiary border-dashed">
            <p className="text-xs text-content-secondary">name</p>
            <h2>{project.title}</h2>
          </div>
          <div className="col-span-4 md:col-span-3 p-3">
            <p className="text-xs text-content-secondary ">inception</p>
            <p className="text-lg pt-1">{project.date}</p>
          </div>
        </div>
        <div className="grid grid-cols-10 border-t border-content-tertiary border-dashed flex-1">
          <div className="col-span-6 md:col-span-7 p-3 border-r border-content-tertiary border-dashed relative">
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
