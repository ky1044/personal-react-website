import { useEffect, useState } from "react";
import styles from "./HeroImage.module.css";
import useWindow from "src/hooks/useWindow";

function HeroImage({ scrollHeight }: { scrollHeight: number }) {
  const { isMobile } = useWindow();
  const heroImage = isMobile ? "hero-mobile.jpg" : "hero.jpg";
  return (
    <div className={styles.heroImageContainer}>
      <img
        src={`${process.env.PUBLIC_URL}/${heroImage}`}
        className={styles.heroImage}
      />
      <div
        className={styles.square1}
        style={{
          transform: `translateX(${-scrollHeight / 64}px)`,
        }}
      />
      <div
        className={styles.square2}
        style={{
          transform: `translateX(${-scrollHeight / 16}px)`,
        }}
      />
      <div
        className={styles.square3}
        style={{
          transform: `translateX(${scrollHeight / 36}px)`,
        }}
      />
    </div>
  );
}

export default HeroImage;
