import React, { useMemo, useState } from "react";
import SpheresBlock from "./SpheresBlock";
import CalendarBlock from "./CalendarBlock";
import AboutAnimationBlock from "./AboutAnimationBlock";
import RunningBlock from "./RunningBlock";
import { useSiteData } from "src/providers/SiteDataProvider";
import { motion } from "framer-motion";
import { animationVariants } from "src/consts/animation";
const AboutAnimationSection = () => {
  const { data } = useSiteData();
  const { stravaStats } = data || {};

  const [today, _] = useState(new Date());

  const experienceText = useMemo(() => {
    const startDate = new Date("02/01/2021");
    let yoe = today.getFullYear() - startDate.getFullYear();
    const moe = today.getMonth() - startDate.getMonth();
    const yoeText = `${yoe} years`;
    let moeText = "";
    if (moe > 1) {
      moeText = ` and ${moe} months`;
    } else if (moe === 1) {
      moeText = " and 1 month ";
    }
    return yoeText + moeText;
  }, [today]);

  return (
    <motion.ul
      variants={animationVariants.container}
      initial="hidden"
      animate="show"
      style={{ listStyleType: "none" }}
    >
      <div className="p-4">
        <motion.li variants={animationVariants.individualLarge} key="spheres">
          <AboutAnimationBlock
            Animation={SpheresBlock}
            text={
              <>
                <span className="text-primary-blue">mixed background</span>,
                growing up in Japan and the United States
              </>
            }
            figNumber={1}
          />
        </motion.li>
      </div>

      <div className="w-full border-t border-layout-divider" />
      <div className="p-4">
        <motion.li variants={animationVariants.individualLarge} key="calendar">
          <AboutAnimationBlock
            Animation={CalendarBlock}
            text={
              <>
                <span className="text-primary-blue">experienced developer</span>
                , {experienceText} of industry experience to be exact
              </>
            }
            isReversed
            figNumber={2}
          />
        </motion.li>
      </div>
      <div className="w-full border-t border-layout-divider" />
      <div className="p-4">
        <motion.li variants={animationVariants.individualLarge} key="running">
          <AboutAnimationBlock
            Animation={RunningBlock}
            text={
              <>
                <span className="text-primary-blue">city runner</span>, logging{" "}
                {stravaStats?.ytdDistance
                  ? `${
                      stravaStats?.ytdDistance
                    }km on Strava in ${today.getFullYear()}`
                  : `over 2000km on Strava in total`}
              </>
            }
            figNumber={3}
          />
        </motion.li>
      </div>
    </motion.ul>
  );
};

export default AboutAnimationSection;
