import { useMemo, useState } from "react";
import {
  DownloadLinkIcon,
  ExternalLinkIcon,
  InternalLinkIcon,
} from "src/icons/Icons";

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
    const baseClass = "absolute w-5 h-5 transition-all duration-300";
    const offset = isHovered ? 2 : 0;
    switch (linkType) {
      case "internal":
        return (
          <div className={baseClass} style={{ left: offset, bottom: 0 }}>
            <InternalLinkIcon />
          </div>
        );
      case "external":
        return (
          <div className={baseClass} style={{ left: offset, bottom: offset }}>
            <ExternalLinkIcon />
          </div>
        );
      case "download":
        return (
          <div className={baseClass} style={{ top: offset }}>
            <DownloadLinkIcon />
          </div>
        );
    }
  }, [linkType, isHovered]);

  return (
    <a
      className="no-underline cursor-pointer group"
      href={link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
    >
      <div
        className="flex flex-row justify-between items-center gap-1"
        style={{
          background:
            "linear-gradient(to left, var(--content-primary) 0%, var(--content-primary) 34%, var(--background-primary) 34%, var(--background-primary) 66%, var(--content-primary) 66%, var(--content-primary) 100%) left bottom transparent no-repeat",
          backgroundSize: "300% 2px",
          backgroundPositionX: isHovered ? "0%" : "100%",
          transition: isHovered ? "background-position-x 0.7s" : undefined,
        }}
        onClick={() => onClick?.()}
      >
        <p className="text-[18px] whitespace-nowrap">{text}</p>
        <div className="relative" style={{ width: 22, height: 22 }}>
          {linkIcon}
        </div>
      </div>
    </a>
  );
};
