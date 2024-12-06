import { motion } from "framer-motion";
import useWindow from "src/hooks/useWindow";
import styles from "./HeroImage.module.css";

function HeroImage({ scrollHeight }: { scrollHeight: number }) {
  const { isMobile } = useWindow();
  const heroImage = isMobile ? "hero-mobile.jpg" : "hero.jpg";
  return (
    <div className={styles.heroImageContainer}>
      <img
        src={`${process.env.PUBLIC_URL}/${heroImage}`}
        className={styles.heroImage}
      />
      <motion.div
        className={styles.square1}
        animate={{
          x: -scrollHeight / 64,
          transition: {
            default: { type: "easeInOut" },
          }
        }}
      />
      <motion.div
        className={styles.square2}
        animate={{
          x: -scrollHeight / 16,
          transition: {
            default: { type: "easeInOut" },
          }
        }}
      />
      <motion.div
        className={styles.square3}
        animate={{
          x: scrollHeight / 36,
          transition: {
            default: { type: "easeInOut" },
          }
        }}
      />
    </div>
  );
}

export default HeroImage;
