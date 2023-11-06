
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


