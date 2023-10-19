import {
  DownloadLinkIcon,
  ExternalLinkIcon,
  InternalLinkIcon,
} from "src/icons/Icons";

type ButtonProps = {
  type: "Primary" | "Secondary";
  text: string;
  link?: string;
  onClick?: () => void;
};

export const Button = ({ type, text, link, onClick }: ButtonProps) => {
  const classSuffix = type === "Secondary" ? "secondary" : "";
  return (
    <a
      className={`button-text ${classSuffix}`}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className={`button ${classSuffix}`} onClick={() => onClick?.()}>
        <p style={{ fontSize: 18 }} className="black">
          {text}
        </p>
      </div>
    </a>
  );
};

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
  let linkIcon = null;
  switch (linkType) {
    case "internal":
      linkIcon = <InternalLinkIcon />;
      break;
    case "external":
      linkIcon = <ExternalLinkIcon />;
      break;
    case "download":
      linkIcon = <DownloadLinkIcon />;
      break;
  }
  return (
    <a className={`text-link`} href={link} target="_blank" rel="noreferrer">
      <div className={`text-link-content`} onClick={() => onClick?.()}>
        <p style={{ fontSize: 18 }} className="black">
          {text}
        </p>
        {linkIcon}
      </div>
    </a>
  );
};
