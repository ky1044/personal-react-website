import { useEffect, useState } from "react";
import styles from "./HeroImage.module.css";

function HeroImage({ scrollPosition }: { scrollPosition: number }) {
  return (
    <div className={styles.heroImageContainer}>
      <img
        src={`${process.env.PUBLIC_URL}/hero.jpg`}
        className={styles.heroImage}
      />
      <div
        className={styles.square1}
        style={{
          transform: `translateX(${-scrollPosition / 64}px)`,
        }}
      />
      <div
        className={styles.square2}
        style={{
          transform: `translateX(${-scrollPosition / 16}px)`,
        }}
      />
      <div
        className={styles.square3}
        style={{
          transform: `translateX(${scrollPosition / 36}px)`,
        }}
      />
    </div>
  );
}

export default HeroImage;
