type ButtonProps = {
  type: "Primary" | "Secondary";
  text: string;
  link?: string;
  onClick?: () => void;
};

export const Button = ({ type, text, link, onClick }: ButtonProps) => {
  const classSuffix = type === "Secondary" ? "secondary" : "";
  return (
    <div className={`button ${classSuffix}`} onClick={() => onClick?.()}>
      {link != undefined ? (
        <a
          className={`button-text ${classSuffix}`}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          <p style={{ fontSize: 18 }}>{text}</p>
        </a>
      ) : (
        <p className={`button-text ${classSuffix}`}>{text}</p>
      )}
    </div>
  );
};
