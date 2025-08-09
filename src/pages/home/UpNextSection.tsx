import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { animationVariants } from "src/consts/animation";
import styles from "./UpNextSection.module.css";
const UpNextSection = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-12 px-4">
      <h1 className="text-primary-blue">UP NEXT</h1>
      <motion.div
        className={styles.headerWrapper}
        variants={animationVariants.individualLarge}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className={styles.headerText} id="splash-header-text">
          Thanks for visiting! Check out my{" "}
          <Link to="/experience">
            <span className={styles.link}>experience</span>
          </Link>
          , or learn more{" "}
          <Link to="/about">
            <span className={styles.link}>about me</span>
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
};

export default UpNextSection;
