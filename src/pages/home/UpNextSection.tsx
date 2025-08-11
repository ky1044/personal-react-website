import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import ShinyButton from "src/components/shared/ShinyButton";
import { animationVariants } from "src/consts/animation";
const UpNextSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 border-l border-r border-layout-divider ">
      <div className="flex flex-row justify-between text-primary-blue px-4 pt-24">
        <h1 className="text-primary-blue">UP NEXT</h1>
        <h1 className="text-background-site leading-none sm:block hidden">
          次に
        </h1>
      </div>
      <div className="w-screen border-t border-layout-divider relative left-1/2 -translate-x-1/2" />
      <motion.div
        className="w-fit py-24 mx-auto"
        variants={animationVariants.individualLarge}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2
          className="font-[Roboto_Flex] text-3xl sm:text-5xl font-semibold max-w-[640px] leading-normal sm:leading-normal"
          id="splash-header-text"
        >
          Thanks for visiting! Check out my{" "}
          <Link to="/experience">
            <span className="bg-primary-blue text-background-primary no-underline rounded-[30px] px-4 border border-solid border-background-primary hover:border-primary-blue whitespace-nowrap transition-all duration-300">
              experience
            </span>
          </Link>
          , or learn more{" "}
          <Link to="/about">
            <span className="bg-primary-blue text-background-primary no-underline rounded-[30px] px-4 border border-solid border-background-primary hover:border-primary-blue whitespace-nowrap transition-all duration-300">
              about me
            </span>
          </Link>
          .
        </h2>
      </motion.div>
    </div>
  );
};

export default UpNextSection;
