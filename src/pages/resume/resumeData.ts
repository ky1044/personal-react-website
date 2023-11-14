export const RESUME: {
  title: string;
  organization: string;
  location: string;
  duration: string;
  tech?: string[];
  bullets: string[];
}[] = [
  {
    title: "Software Engineer",
    organization: "Book of the Month",
    location: "New York, NY",
    duration: "May 2023 - Present",
    tech: ["React.js", "React Native", "Next.js", "Node.js"],
    bullets: [
      "Full-stack development for book subscription service’s consumer-facing website and app.",
    ],
  },
  {
    title: "Full-Stack Software Engineer",
    organization: "CertiK",
    location: "New York, NY (Remote)",
    duration: "May 2022 - March 2023",
    tech: [
      "React.js",
      "Next.js",
      "Node.js",
      "AWS Lambda",
      "AWS Lambda",
      "DynamoDB",
    ],
    bullets: [
      "Full-stack web development of portal for web3 startup’s main service, a security audit of blockchain code. Users include external clients, internal support, and admin staff.",
      "Led development efforts of new database schemas, caching strategies, and scheduling automated workers. Developed API endpoints to use with partner teams and worked with team’s designer to implement frontend based on Figma UI spec.",
      "Took ownership of team’s notification pipeline, which sends messages to users through e-mail, Slack, and Telegram.",
      "Incorporated unit tests (Jest) into the CI/CD pipeline and automated end-to-end tests (Cypress) to monitor the staging site.",
    ],
  },
  {
    title: "Software Engineering Associate",
    organization: "Morgan Stanley",
    location: "New York, NY",
    duration: "February 2021 - May 2022",
    tech: ["AngularJS", "Java","Spring"],
    bullets: [
      "Developed a POC dashboard displaying real-time status of trades from multiple databases.",
      "Developed team’s main product that calculates daily Profit/Losses for $1 Billion+ portfolio of Fixed-Income Securities, communicating closely with BUs and QA team to regularly deliver new functionality and bug-fixes.",
      "Headed development on a key micro-service as part of a complete redesign of team’s main product.",
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
    tech: ["Python", "Flask"],
    bullets: [
      "Engineered and analyzed mortgage application data using ML to determine inefficiencies and bottlenecks.",
      "Developed a REST API that returns raw/aggregate data, as well as ML forecasts to client dashboard.",
    ],
  },
  {
    title: "System Data and Research Intern",
    organization: "MTA",
    location: "New York, NY",
    duration: "May 2019 - July 2019",
    tech: ["Python", "SQL", "NoSQL", "MinIO"],
    bullets: [
      "Developed data pipelines to process live broadcast data of buses and store it for future use in ridership analysis.",
      "Processed and transferred millions of data points using SQL, NoSQL, and MinIO (S3 data warehousing alternative).",
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
