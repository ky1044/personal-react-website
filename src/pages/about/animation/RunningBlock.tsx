import useAnimationFrame from "src/hooks/useAnimationFrame";
import styles from "./RunningBlock.module.css";

const RunningBlock = ({ isActive }: { isActive: boolean }) => {
  const { animationFrame: offset } = useAnimationFrame({
    animationSpeed: 0.03,
  });

  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      <svg viewBox="0 0 306 206" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M211.487 24.2933L202.877 19.6544L187.865 45.4995L140.62 19.6544L94.2576 28.7112L92.7122 53.4519L88.5176 84.1568L84.5437 108.677L79.466 133.196L74.3882 154.403L69.5312 173.179L76.5959 172.737L80.7906 173.842L80.1283 182.678L86.7514 189.305L89.5 190L101.543 186.654L106.621 183.34L107.945 180.69L123.399 167.657L126.049 166.773L127.815 164.343L131.568 161.25L144.814 151.973L160.048 149.322L176.385 146.45L194.046 142.253L213.253 140.044L214.357 133.859L223.85 132.313L229.59 119.721L234.889 104.038V99.8406L236.434 97.8525L237.98 92.551L240.85 90.7838L243.72 87.4703L247.031 74.6582L248.135 65.6013L247.031 62.9505L249.018 54.1146V45.4995L245.486 39.5353L239.967 33.7919L237.98 28.7112L216.123 16.7827L211.487 24.2933Z"
          className={styles.mainPath}
          strokeLinejoin="round"
          strokeOpacity={1}
          strokeDashoffset={`${offset}%`}
          strokeDasharray={"10% 230%"}
        />
        <path
          d="M225 1H178.5H137.5L117.5 44.5L107 128L118.5 132.5L136.5 101L144 108L168 118.5L183.5 77L225 1Z"
          className={styles.mainPath}
          strokeLinejoin="round"
          strokeOpacity={1}
          strokeDashoffset={`${offset}%`}
          strokeDasharray={"10% 160%"}
        />

        <path
          d="M195 205H305V150L162 92L154 112.5L195 205Z"
          className={styles.mainPath}
          strokeLinejoin="round"
          strokeOpacity={1}
          strokeDashoffset={`${offset}%`}
          strokeDasharray={"10% 160%"}
        />
        <path
          d="M138 1H95.5L93.5 41L117.5 44.5L149.5 63L212 89L233 52L138 1Z"
          className={styles.mainPath}
          strokeLinejoin="round"
          strokeOpacity={1}
          strokeDashoffset={`${offset}%`}
          strokeDasharray={"10% 130%"}
        />

        <mask id="background-mask">
          <ellipse
            className={styles.maskRect}
            cx="50%"
            cy="50%"
            rx="65%"
            ry="65%"
          />
        </mask>
        <g mask="url(#background-mask)">
          <path d="M211.487 24.2933L202.877 19.6544L187.865 45.4995L140.62 19.6544L94.2576 28.7112L92.7122 53.4519L88.5176 84.1568L84.5437 108.677L79.466 133.196L74.3882 154.403L69.5312 173.179L76.5959 172.737L80.7906 173.842L80.1283 182.678L86.7514 189.305L89.5 190L101.543 186.654L106.621 183.34L107.945 180.69L123.399 167.657L126.049 166.773L127.815 164.343L131.568 161.25L144.814 151.973L160.048 149.322L176.385 146.45L194.046 142.253L213.253 140.044L214.357 133.859L223.85 132.313L229.59 119.721L234.889 104.038V99.8406L236.434 97.8525L237.98 92.551L240.85 90.7838L243.72 87.4703L247.031 74.6582L248.135 65.6013L247.031 62.9505L249.018 54.1146V45.4995L245.486 39.5353L239.967 33.7919L237.98 28.7112L216.123 16.7827L211.487 24.2933Z" />
          <path d="M225 1H178.5H137.5L117.5 44.5L107 128L118.5 132.5L136.5 101L144 108L168 118.5L183.5 77L225 1Z" />
          <path d="M195 205H305V150L162 92L154 112.5L195 205Z" />
          <path d="M138 1H95.5L93.5 41L117.5 44.5L149.5 63L212 89L233 52L138 1Z" />

          <path d="M118.744 132.465L186 204" />
          <path d="M145 2L153.257 111.374" />
          <path d="M151 80L121.5 65.6835L1 40.5" />
          <path d="M148 205L160.5 177L181.5 174.5L222.5 177.5L228 184.5V190.5L235 199.5H261L266.5 172L262 148L269.5 115.5L275.5 98L290 69.5L305 30" />
          <path d="M263.5 140.5L305 146" />
          <path d="M278.5 92.5L305 111.5" />
          <path d="M107 129L117.364 44.3333L137 2" />
          <path d="M82.9531 119.043L118.744 132.465" />
          <path d="M118.744 132.465L192 2" />
          <path d="M69.5 173L70 180.5L76 187L82.5 190.5L91 189.5" />
          <path d="M118.744 132.465L186 204" />
          <path d="M145 2L153.257 111.374" />
          <path d="M151 80L121.5 65.6836" />
          <path d="M107 129L117.364 44.3333L137 2" />
          <path d="M82.9531 119.043L118.744 132.465" />
          <path d="M118.744 132.465L192 2" />
          <path d="M92 59.5L136.5 101" />
          <path d="M81 174L109 129" />
          <path d="M82.5 185.5L97.5 180L124 156L133.5 144.5L154 112.5L162 91.5L174.5 48.5L201 2" />
          <path d="M168 118.5L169.5 148" />
          <path d="M212 89L235.5 99" />
          <path d="M304.5 102L284 127L275.5 146.5L272 165" />
          <path d="M265.5 167L284.5 163L305 166" />
          <path d="M267 134L273 119.5L305 80" />
          <path d="M266 177.5L291.5 205" />
          <path d="M167.5 184.5L158 205" />
          <path d="M162.5 196L187 205" />
          <path d="M203 176L201.5 205" />
          <path d="M167 185L213.5 187L216 194.5L215 205" />
        </g>
      </svg>
    </div>
  );
};

export default RunningBlock;
