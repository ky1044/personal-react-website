import React from "react";
import styles from "./UpNextSection.module.css";
import { motion } from "framer-motion";
import { animationVariants } from "src/consts/animation";

const UpNextSection = () => {
  return (
    <div className="top-level-container">
      <h1 className="blue">UP NEXT</h1>
      <motion.div
        className={styles.headerWrapper}
        variants={animationVariants.individualLarge}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className={styles.headerText} id="splash-header-text">
          Thanks for visiting! <br />
          Check out my <a href="/experience">experience</a>, or learn <br />
          more <a href="/about">about </a>me.
        </p>
      </motion.div>
    </div>
  );
};

export default UpNextSection;
