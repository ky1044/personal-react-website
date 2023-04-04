import { ProjectDetail } from "src/utils/types";

export const projects: ProjectDetail[] = [
  {
    title: "Personal Website",
    date: "March, 2023",
    image: `${process.env.PUBLIC_URL}/project-images/personal-project.png` ,
    imageWidth:150,
    description:
      "Personal website, built in React. It's a new project so there is a lot of work to do!",
    url: "https://github.com/ky1044/personal-react-website",
  },
  {
    title: "Bikeable",
    date: "October, 2020",
    image: `${process.env.PUBLIC_URL}/project-images/bikeable.png`,
    description:
      "Website to find the current and past status of the nearest Citibike stations. Built in React and Flask.",
    url: "https://github.com/ky1044/Bikeable",
  },
];
