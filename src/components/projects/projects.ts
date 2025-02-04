import { ProjectDetail } from "src/utils/types";

export const projects: ProjectDetail[] = [
  {
    title: "//TODO:",
    date: "August, 2024",
    image: `${process.env.PUBLIC_URL}/project-images/todo.png`,
    description: "A minimalist todo app, made to be simple and easy to use.",
    tech: ["React.js", "Tailwind CSS", "shadcn/ui"],
    url: "https://github.com/kenyokokawa/todo",
  },
  {
    title: "Personal Website",
    date: "March, 2023",
    image: `${process.env.PUBLIC_URL}/project-images/personal-project.png`,
    description:
      "Personal portfolio website (the one you're on right now), to try out new front-end libraries and industry practices.",
    tech: ["React.js", "HTML", "CSS", "Github Actions"],
    url: "https://github.com/ky1044/personal-react-website",
  },
  {
    title: "Bikeable",
    date: "October, 2020",
    image: `${process.env.PUBLIC_URL}/project-images/bikeable.png`,
    description:
      "Single-page web application that uses historical Citibike data to show status of the nearest Citibike stations, along with availability data from the past week.",
    tech: ["React.js", "Flask", "AWS Elastic Beanstalk"],
    url: "https://github.com/ky1044/Bikeable",
  },
];
