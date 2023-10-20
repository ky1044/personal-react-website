import React from "react";
import styles from "./TechTag.module.css";

const TECH_MAP = {
  "React.js": {
    backgroundColor: "#61dbfb",
  },
  HTML: {
    backgroundColor: "#f06629",
  },
  CSS: {
    backgroundColor: "#32a9dc",
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
