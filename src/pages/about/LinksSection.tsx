import React from "react";
import { links } from "./links";
import { TextLink } from "src/components/shared/TextLink";
import styles from "./LinksSection.module.css";

const LinksSection = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className={styles.sidebarBlock} />
      <div className={styles.centerBlock} style={{ flex: 12 }}>
        <div className={styles.linksContainer}>
          <h2>Some links</h2>
          {links.map((link, idx) => (
            <TextLink
              text={link.label}
              link={link.href}
              linkType="external"
              key={idx}
            />
          ))}
        </div>
      </div>
      <div className={styles.sidebarBlock} />
    </div>
  );
};

export default LinksSection;