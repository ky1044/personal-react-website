import { motion } from "framer-motion";
import { TextLink } from "src/components/shared/TextLink";
import { animationVariants } from "src/consts/animation";
import { links } from "./links";
import styles from "./LinksSection.module.css";

const LinksSection = () => {
  return (
    <motion.div
      variants={animationVariants.containerQuick}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div variants={animationVariants.individual}>
        <h2>{"Some <ul>s to wrap things up"}</h2>
      </motion.div>
      <motion.div variants={animationVariants.individual}>
        <div className={styles.linksContainer}>
          <div className={styles.linkColumn}>
            <h3>Media I like</h3>
            <ul>
              <li>Dark Matter</li>
              <li>Smash Brothers</li>
              <li>Tomorrow, and Tomorrow, and Tomorrow</li>
              <li>Severance (both by Ling Ma and on Apple TV+)</li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3>Go-to NYC spots</h3>
            <ul>
              <li>Soothr</li>
              <li>Four Horsemen</li>
              <li>Nubiani</li>
              <li>Tabetomo</li>
              <li>La Dong</li>
              <li>886</li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3>Links</h3>
            {links.map((link, idx) => (
              <TextLink
                text={link.label}
                link={link.href}
                linkType="external"
                key={idx}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LinksSection;
