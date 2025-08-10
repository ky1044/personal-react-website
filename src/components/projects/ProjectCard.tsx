import { ProjectDetail } from "src/utils/types";
import TechTag from "../shared/TechTag";
import { TextLink } from "../shared/TextLink";

const ProjectCard = ({ project }: { project: ProjectDetail }) => {
  return (
    <div className="border-t border-content-tertiary pt-8 flex flex-row justify-between gap-[7em] max-[960px]:flex-col-reverse max-[960px]:items-center max-[960px]:gap-4">
      <div className="flex flex-col justify-between gap-4 w-full">
        <div>
          <h2>{project.title}</h2>
          <p className="text-content-secondary text-[16px]">Since {project.date}</p>
        </div>
        <p>{project.description}</p>
        <div>
          <div className="flex flex-row justify-between items-center flex-wrap gap-x-1 gap-y-2">
            <div className="flex flex-row flex-wrap gap-1">
              {project.tech.map((tech) => (
                <TechTag name={tech} key={tech} />
              ))}
            </div>
            <div className="flex justify-end grow-0 shrink-0 gap-4">
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
      <div className="min-h-[250px] min-w-[400px] w-1/3 flex justify-center max-[960px]:min-w-0 max-[960px]:min-h-0 max-[960px]:w-full">
        <img
          className="max-h-full max-w-full object-cover block m-auto rounded-[12px]"
          src={project.image}
          alt={project.title}
          style={{ width: project?.imageWidth ?? undefined }}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
