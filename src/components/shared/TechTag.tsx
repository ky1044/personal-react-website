import React from "react";

const TECH_MAP: Record<string, { borderColor: string }> = {
  "React.js": {
    borderColor: "#61dbfb",
  },
  "React Native": {
    borderColor: "#61dbfb",
  },
  "Next.js": {
    borderColor: "#111",
  },
  "Node.js": {
    borderColor: "#83cd29",
  },
  HTML: {
    borderColor: "#f06629",
  },
  CSS: {
    borderColor: "#32a9dc",
  },
  AngularJS: {
    borderColor: "#dd1b16",
  },
  Java: {
    borderColor: "#f89820",
  },
  Spring: {
    borderColor: "#6fb342",
  },
  Python: {
    borderColor: "#4486b7",
  },
  SQL: {
    borderColor: "#e38d13",
  },
  NoSQL: {
    borderColor: "#339933",
  },
  "MinIO ": {
    borderColor: "#4393c4",
  },
  DynamoDB: {
    borderColor: "#4d97d1",
  },
  Flask: {
    borderColor: "#111",
  },
  "Next.js App Router": {
    borderColor: "#111",
  },
  Clerk: {
    borderColor: "#111",
  },
  Postgres: {
    borderColor: "#699eca",
  },
  "drizzle ORM": {
    borderColor: "#C5F74E",
  },
  "Tailwind CSS": {
    borderColor: "#00BCFF",
  },
};

function TechTag({ name }: { name: string }) {
  return (
    <div
      className="flex justify-center items-center h-10 rounded-full border-[3px] border-solid px-4 font-semibold"
      style={TECH_MAP[name]}
    >
      <p className="text-xs">{name}</p>
    </div>
  );
}

export default TechTag;
