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
  MinIO: {
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

type TechTagProps = { name: string; size?: "sm" | "md"; hasGlow?: boolean };

function TechTag({ name, size = "md", hasGlow = false }: TechTagProps) {
  const wrapperClass =
    size === "sm"
      ? "flex justify-center items-center h-5 rounded-full border-[2px] border-solid px-2 font-semibold"
      : "flex justify-center items-center h-8 rounded-full border-[3px] border-solid px-4 font-semibold";
  const textClass = size === "sm" ? "text-[10px]" : "text-xs";
  const borderColor = TECH_MAP[name]?.borderColor;
  const tagStyle: React.CSSProperties | undefined = borderColor
    ? {
        borderColor,
        boxShadow: hasGlow ? `0 0 15px ${borderColor}44` : undefined,
      }
    : undefined;
  return (
    <div className={wrapperClass} style={tagStyle}>
      <p className={textClass}>{name}</p>
    </div>
  );
}

export default TechTag;
