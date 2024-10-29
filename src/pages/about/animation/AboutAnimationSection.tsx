import React, { useMemo } from "react";
import styles from "./AboutAnimationSection.module.css";
import SpheresBlock from "./SpheresBlock";
import CalendarBlock from "./CalendarBlock";
import AboutAnimationBlock from "./AboutAnimationBlock";
import RunningBlock from "./RunningBlock";

const AboutAnimationSection = () => {
  const experienceText = useMemo(() => {
    const today = new Date();
    const startDate = new Date("02/01/2021");
    let yoe = today.getFullYear() - startDate.getFullYear();
    const moe = today.getMonth() - startDate.getMonth();
    const yoeText = `${yoe} years`;
    let moeText = null;
    if (moe > 1) {
      moeText = ` and ${moe} months`;
    } else if (moe === 1) {
      moeText = " and 1 month ";
    }
    return yoeText + moeText;
  }, []);

  return (
    <div className={styles.container}>
      <AboutAnimationBlock
        Animation={SpheresBlock}
        text={
          <>
            <span className="blue">mixed background</span>, growing up in Japan
            and the United States
          </>
        }
      />
      <AboutAnimationBlock
        Animation={CalendarBlock}
        text={
          <>
            <span className="blue">experienced developer</span>,{" "}
            {experienceText} of industry experience to be exact
          </>
        }
        isReversed
      />
      <AboutAnimationBlock
        Animation={RunningBlock}
        text={
          <>
            <span className="blue">city runner</span>, logging over 603km on Strava
            in 2024
          </>
        }
      />
    </div>
  );
};

export default AboutAnimationSection;
