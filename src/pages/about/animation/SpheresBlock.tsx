import styles from "./SpheresBlock.module.css";

const SpheresBlock = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className={styles.svgContainer}
      >
        <defs>
          <path
            id="ellipsePath"
            d="M 15, 50 a 35, 22 0 1, 1 70, 0 a 35, 22 0 1, 1 -70, 0"
          />
          <mask id="sphereMask">
            <circle r="23" className={styles.maskSphere} fill="white">
              <animateMotion dur="6s" repeatCount="indefinite" begin="0">
                <mpath href="#ellipsePath" />
              </animateMotion>
            </circle>
          </mask>
        </defs>
        {/* only for debugging */}
        {/* <use href="#ellipsePath" fill="none" stroke="blue" strokeWidth="1" /> */}

        <image
          href="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
          x="-20"
          y="0"
          width="350"
          mask="url(#sphereMask)"
        />

        <circle r="23" className={styles.sphere1}>
          <animateMotion dur="6s" repeatCount="indefinite" begin="0s">
            <mpath href="#ellipsePath" />
          </animateMotion>
        </circle>

        <circle r="23" className={styles.sphere2}>
          <animateMotion dur="6s" repeatCount="indefinite" begin="-3s">
            <mpath href="#ellipsePath" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  );
};

export default SpheresBlock;
