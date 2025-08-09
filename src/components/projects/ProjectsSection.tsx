import { animationVariants } from "src/consts/animation";
import ProjectCard from "./ProjectCard";
import { projects } from "./projects";
import styles from "./Projects.module.css";
import { motion } from "framer-motion";

const ProjectsSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-12 px-4">
      <h1 className="text-primary-blue">PROJECTS</h1>
      <div className={styles.projectsSection}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={animationVariants.individualLarge}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
