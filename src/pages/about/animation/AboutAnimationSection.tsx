import React, { useMemo, useState } from "react";
import styles from "./AboutAnimationSection.module.css";
import SpheresBlock from "./SpheresBlock";
import CalendarBlock from "./CalendarBlock";
import AboutAnimationBlock from "./AboutAnimationBlock";
import RunningBlock from "./RunningBlock";
import { useSiteData } from "src/providers/SiteDataProvider";

const AboutAnimationSection = () => {
  const { data } = useSiteData();
  const { stravaStats } = data || {};

  const [today, _] = useState(new Date());

  const experienceText = useMemo(() => {
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
  }, [today]);

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
            <span className="blue">city runner</span>, logging{" "}
            {stravaStats?.ytdDistance
              ? `${
                  stravaStats?.ytdDistance
                }km on Strava in ${today.getFullYear()}`
              : `over 2000km on Strava in total`}
          </>
        }
      />
    </div>
  );
};

export default AboutAnimationSection;
