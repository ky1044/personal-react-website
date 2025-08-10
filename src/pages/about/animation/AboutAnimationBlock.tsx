import { ComponentType, ReactNode, useState } from "react";

type AnimationComponentProps = {
  isActive: boolean;
};

const AboutAnimationBlock = ({
  Animation,
  text,
  isReversed = false,
}: {
  Animation: ComponentType<AnimationComponentProps>;
  text: ReactNode;
  isReversed?: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={`w-full flex gap-8 ${
        isReversed ? "flex-row-reverse" : ""
      } max-[680px]:block`}
    >
      <div
        className="relative bg-[linear-gradient(180deg,#24a0ff,#0185ff)] rounded-[12px] w-[60%] aspect-[3/2] overflow-clip max-[680px]:w-full"
        onMouseEnter={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          setIsActive(false);
        }}
      >
        <Animation isActive={isActive} />
      </div>
      <div
        className={`flex-[0_1_330px] ${
          isActive ? "[&_.text-primary-blue]:text-secondary-blue" : ""
        } max-[680px]:mt-6`}
      >
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default AboutAnimationBlock;
