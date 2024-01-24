import { useEffect } from "react";
import { MoonIcon, SunIcon } from "src/icons/Icons";
import { useDarkMode } from "src/providers/DarkModeProvider";
import styles from "./DarkModeToggle.module.css";

function DarkModeToggle() {
  const {isDarkMode, setIsDarkMode} = useDarkMode()

  return (
    <div
      className={styles.mainContainer}
      onClick={() => setIsDarkMode((prev) => !prev)}
    >
      {" "}
      <p>{isDarkMode ? "Dark" : "Light"} mode</p>
      <div className={styles.iconContainer}>
        <div
          className={`${styles.icon} ${
            isDarkMode ? styles.light : styles.dark
          }`}
        >
          <MoonIcon size={18} />
          <SunIcon size={20} />
        </div>
      </div>
    </div>
  );
}

export default DarkModeToggle;
