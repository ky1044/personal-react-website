import { useMemo, useState } from "react";
import {
  DownloadLinkIcon,
  ExternalLinkIcon,
  InternalLinkIcon,
} from "src/icons/Icons";
import styles from "./TextLink.module.css";

type TextLinkProps = {
  linkType?: "internal" | "external" | "download";
  text: string;
  link?: string;
  onClick?: () => void;
};

export const TextLink = ({
  text,
  linkType = "internal",
  link,
  onClick,
}: TextLinkProps) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);

    setTimeout(() => {
      setHovered(false);
    }, 700);
  };

  const linkIcon = useMemo(() => {
    switch (linkType) {
      case "internal":
        return (
          <div className={`${styles.iconContainer} ${styles.right}`}>
            <InternalLinkIcon />
          </div>
        );
      case "external":
        return (
          <div className={`${styles.iconContainer} ${styles.topRight}`}>
            <ExternalLinkIcon />
          </div>
        );
      case "download":
        return (
          <div className={`${styles.iconContainer} ${styles.bottom}`}>
            <DownloadLinkIcon />
          </div>
        );
    }
  }, [linkType, isHovered]);

  return (
    <a
      className={styles.textLink}
      href={link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
    >
      <div
        className={`${styles.textLinkContent} ${
          isHovered ? styles.active : ""
        }`}
        onClick={() => onClick?.()}
      >
        <p style={{ fontSize: 18 }} className="black">
          {text}
        </p>
        <div style={{ position: "relative", width: 22, height: 22 }}>
          {linkIcon}
        </div>
      </div>
    </a>
  );
};
