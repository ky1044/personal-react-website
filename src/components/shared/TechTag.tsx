import React from "react";
import styles from "./TechTag.module.css";

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
};

function TechTag({ name }: { name: string }) {
  return (
    <div className={styles.tagContainer} style={TECH_MAP[name]}>
      <p className="p3">{name}</p>
    </div>
  );
}

export default TechTag;
