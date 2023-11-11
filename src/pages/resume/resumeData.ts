export const RESUME: {
  title: string;
  organization: string;
  location: string;
  duration: string;
  bullets: string[];
}[] = [
  {
    title: "Software Engineer",
    organization: "Book of the Month",
    location: "New York, NY",
    duration: "May 2023 - Present",
    bullets: [
    ],
  },
  {
    title: "Full-Stack Software Engineer",
    organization: "CertiK",
    location: "New York, NY (Remote)",
    duration: "May 2022 - March 2023",
    bullets: [
      "Full-stack web development of portal for company’s main service, a security audit of client blockchain code. Users include external clients, internal support, and admin staff (React, Next.js, Node.js, AWS - Lambda, Fargate and Dynamo DB).",
      "Led development efforts of new database schemas, caching strategies, and scheduling automated workers. Developed API endpoints to use with partner teams and worked with team’s designer to implement frontend based on Figma UI spec.",
      "Took ownership of team’s notification pipeline, which sends messages to users through e-mail, Slack, and Telegram.",
      "Incorporated unit tests (Jest) into the CI/CD pipeline and automated end-to-end tests (Cypress) to monitor the staging site.",
      "Conducted code reviews, documented application modules and best practices, and onboarded and mentored a new intern.",
    ],
  },
  {
    title: "Software Engineering Associate",
    organization: "Morgan Stanley",
    location: "New York, NY",
    duration: "February 2021 - May 2022",
    bullets: [
      "Developed a POC dashboard displaying real-time status of trades from multiple databases (Angular JS, Java/Spring).",
      "Developed team’s main product that calculates daily Profit/Losses for $1 Billion+ portfolio of Fixed-Income Securities, communicating closely with BUs and QA team to regularly deliver new functionality and bug-fixes (Java/Spring).",
      "Headed development on a key micro-service as part of a complete redesign of team’s main product (Java/Spring).",
    ],
  },
  {
    title: "Bachelor's Degree",
    organization: "NYU",
    location: "New York, NY",
    duration: "December 2020",
    bullets: [
      "B.S. in Business (concentration in Statistics), at the Stern School of Business",
      "Double Major in Computer Science, at the College of Arts and Sciences",
      "GPA: 3.89/4.0",
    ],
  },
  {
    title: "Technology Summer Analyst",
    organization: "Morgan Stanley",
    location: "Tokyo, Japan (Remote)",
    duration: "June 2020 - August 2020",
    bullets: [
      "Engineered and analyzed mortgage application data using ML to determine inefficiencies and bottlenecks (Python).",
      "Developed a REST API that returns raw/aggregate data, as well as ML forecasts to client dashboard (Python/Flask).",
    ],
  },
  {
    title: "System Data and Research Intern",
    organization: "MTA",
    location: "New York, NY",
    duration: "May 2019 - July 2019",
    bullets: [
      "Developed data pipelines to process live broadcast data of buses and store it for future use in ridership analysis.",
      "Processed and transferred millions of data points, using SQL, NoSQL, and MinIO (S3 data warehousing alternative).",
      "Optimized existing data transfer processes through multiprocessing, reducing total runtime of 2 hours by over 40%.",
    ],
  },
  {
    title: "Data & Research Intern",
    organization: "Sigma Ratings",
    location: "New York, NY",
    duration: "November 2018 - January 2019",
    bullets: [
      "Worked on validation for a NLP ML algorithm by reading over 2,000 news articles of world events affecting countries’ risk ratings. Provided insights and feedback about ML algorithm by comparing algorithm predictions and own analysis.",
    ],
  },
];
