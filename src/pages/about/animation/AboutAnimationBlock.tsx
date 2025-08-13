import { ComponentType, ReactNode, useMemo, useState } from "react";

type AnimationComponentProps = {
  isActive: boolean;
};

const AboutAnimationBlock = ({
  Animation,
  text,
  isReversed = false,
  figNumber,
}: {
  Animation: ComponentType<AnimationComponentProps>;
  text: ReactNode;
  isReversed?: boolean;
  figNumber: number;
}) => {
  const [isActive, setIsActive] = useState(false);

  const figLabel = useMemo(() => {
    const padded = String(figNumber).padStart(2, "0");
    return `FIG ${padded}`;
  }, [figNumber]);

  return (
    <div
      className={`w-full block sm:flex gap-8 ${
        isReversed ? "flex-row-reverse" : ""
      } relative`}
    >
      <div className="relative w-full sm:w-[60%] aspect-[3/2] p-4">
        <span className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-content-secondary rounded-tl-[0px]" />
        <span className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-content-secondary rounded-tr-[0px]" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-content-secondary rounded-bl-[0px]" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-content-secondary rounded-br-[0px]" />

        <div
          className="relative bg-[linear-gradient(180deg,#24a0ff,#0185ff)] rounded-[0px] h-full w-full overflow-clip"
          onMouseEnter={() => {
            setIsActive(true);
          }}
          onMouseLeave={() => {
            setIsActive(false);
          }}
        >
          <Animation isActive={isActive} />
        </div>
      </div>

      <div
        className={`flex-[0_1_330px] relative flex flex-col justify-center pt-6 sm:pt-0`}
      >
        <div
          className={`flex items-center gap-2 text-[14px] text-content-secondary absolute top-0 left-0`}
        >
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              isActive
                ? "bg-primary-blue animate-pulse shadow-[0_0_12px_rgba(36,160,255,0.8)]"
                : "bg-background-secondary"
            }`}
          />
          <span className="font-mono tracking-tight">{figLabel}</span>
        </div>
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default AboutAnimationBlock;
