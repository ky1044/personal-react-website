import { ComponentType, ReactNode, useState } from "react";
import styles from "./AboutAnimationBlock.module.css";

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
    <div className={`${styles.container} ${isReversed ? styles.reversed : ""}`}>
      <div
        className={styles.aboutBlock}
        onMouseEnter={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          setIsActive(false);
        }}
      >
        <Animation isActive={isActive} />
      </div>
      <div className={`${styles.aboutText} ${isActive ? styles.active : ""}`}>
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default AboutAnimationBlock;
