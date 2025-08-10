import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { animationVariants } from "src/consts/animation";
const UpNextSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-12 px-4">
      <h1 className="text-primary-blue">UP NEXT</h1>
      <motion.div
        className="w-fit my-16 mx-auto"
        variants={animationVariants.individualLarge}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className="font-[Roboto_Flex] text-[clamp(20px,4vw,36px)] font-semibold leading-normal tracking-[1.2px] max-w-[640px]" id="splash-header-text">
          Thanks for visiting! Check out my{" "}
          <Link to="/experience">
            <span className="bg-primary-blue text-background-primary no-underline rounded-[30px] px-4 border border-solid border-background-primary hover:border-primary-blue whitespace-nowrap">experience</span>
          </Link>
          , or learn more{" "}
          <Link to="/about">
            <span className="bg-primary-blue text-background-primary no-underline rounded-[30px] px-4 border border-solid border-background-primary hover:border-primary-blue whitespace-nowrap">about me</span>
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
};

export default UpNextSection;
