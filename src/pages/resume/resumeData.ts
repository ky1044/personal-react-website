export type ResumeEntry = {
  title: string;
  organization: string;
  location: string;
  /**
   * Start, as "YYYY-MM". Omit for something that only has an end date — a
   * degree is conferred, not worked through.
   */
  from?: string;
  /** End, as "YYYY-MM", or the literal "present" for an ongoing role. */
  to?: string;
  /** An earlier title held at the same organisation, before a promotion. */
  priorTitle?: { title: string; until: string };
  tech?: string[];
  bullets: string[];
};

/**
 * Bullets describe responsibilities rather than outcomes — what the work was,
 * not what it moved. Figures belong on the resume PDF, not here.
 *
 * Dates are stored sortable and unambiguous rather than as display strings;
 * `formatMonth` turns them into the "05/2023" the section renders.
 */
export const RESUME: ResumeEntry[] = [
  {
    title: "Senior Software Engineer",
    organization: "Betterment",
    location: "New York, NY",
    from: "2026-05",
    to: "present",
    tech: ["React.js", "TypeScript", "Playwright", "Chromatic"],
    bullets: [
      "Front-end and infrastructure development on the web platform team.",
      "Work across Chromatic, Playwright, and package upgrades, and on the development and adoption of our design system.",
      "Migrating the application from Rails to React using AI harnesses.",
    ],
  },
  {
    title: "Senior Software Engineer",
    organization: "Book of the Month",
    location: "New York, NY",
    from: "2023-05",
    to: "2026-05",
    priorTitle: { title: "Software Engineer", until: "2026-02" },
    tech: ["React.js", "React Native", "Next.js", "Node.js"],
    bullets: [
      "Full-stack development for the web and mobile platforms, in React, React Native and Node.",
      "Designed and shipped A/B experiments across the enrollment and merchandising funnels.",
      "Drove technical execution for company-wide initiatives, including a brand refresh and the launch of our sister brand's website.",
      "Migrated the member website to the Next.js App Router during the brand refresh.",
      "Led projects to improve the member experience, including a notification center and a member-backed book funding initiative.",
    ],
  },
  {
    title: "Full-Stack Software Engineer",
    organization: "CertiK",
    location: "New York, NY (Remote)",
    from: "2022-05",
    to: "2023-03",
    tech: ["React.js", "Next.js", "Node.js", "AWS Lambda", "DynamoDB"],
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
    from: "2021-02",
    to: "2022-05",
    tech: ["AngularJS", "Java", "Spring"],
    bullets: [
      "Developed a POC dashboard displaying real-time status of trades from multiple databases.",
      "Developed team’s main product, calculating daily profit and loss for a portfolio of fixed-income securities, working closely with business units and QA to deliver new functionality and bug-fixes.",
      "Headed development on a key micro-service as part of a complete redesign of team’s main product.",
    ],
  },
  {
    title: "Bachelor's Degree",
    organization: "NYU",
    location: "New York, NY",
    to: "2020-12",
    bullets: [
      "B.S. in Business (concentration in Statistics), at the Stern School of Business",
      "Double Major in Computer Science, at the College of Arts and Sciences",
    ],
  },
  {
    title: "Technology Summer Analyst",
    organization: "Morgan Stanley",
    location: "Tokyo, Japan (Remote)",
    from: "2020-06",
    to: "2020-08",
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
    from: "2019-05",
    to: "2019-07",
    tech: ["Python", "SQL", "NoSQL", "MinIO"],
    bullets: [
      "Developed data pipelines to process live broadcast data of buses and store it for future use in ridership analysis.",
      "Processed and transferred data using SQL, NoSQL, and MinIO (an S3 data warehousing alternative).",
      "Optimized existing data transfer processes through multiprocessing.",
    ],
  },
  {
    title: "Data & Research Intern",
    organization: "Sigma Ratings",
    location: "New York, NY",
    from: "2018-11",
    to: "2019-01",
    bullets: [
      "Worked on validation for an NLP ML algorithm by reading news articles of world events affecting countries’ risk ratings. Provided insights and feedback by comparing the algorithm’s predictions against my own analysis.",
    ],
  },
];
