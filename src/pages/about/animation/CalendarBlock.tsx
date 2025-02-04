import { useEffect, useState } from "react";
import styles from "./CalendarBlock.module.css";
const CalendarBlock = ({ isActive }: { isActive: boolean }) => {
  const [today] = useState(new Date());
  const thisYear = today.getFullYear();
  const numYears = thisYear - 2020;
  const howManyMonthsSoFarThisYear = today.getMonth() + 1;
  const years = Array.from({ length: numYears }, (_, i) => i + 2021);

  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prevOffset) => (prevOffset + 1) % 36);
    }, 96);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.container} ${isActive ? styles.active : ""}`}
      style={{
        left: `${(numYears - 1) * -100}%`,
        width: `${numYears * 100}%`,
        transform: isActive
          ? `translateX(${(100 / numYears) * (numYears - 1)}%)`
          : "",
      }}
    >
      {years.map((year) => {
        return (
          <div
            key={year}
            className={styles.yearContainer}
            style={{
              width: `${100 / numYears}%`,
            }}
          >
            <h4 className={styles.yearText}>{year}</h4>
            <div className={styles.year}>
              {Array.from({ length: 3 }).map((_, quarterIndex) => {
                return (
                  <div key={quarterIndex} className={styles.quarter}>
                    {Array.from({ length: 4 }).map((_, monthIndex) => {
                      const month = quarterIndex * 4 + monthIndex + 1;

                      const isCurrentWave =
                        month === waveOffset || month === waveOffset + 1;
                      const monthStyle = isCurrentWave
                        ? { transform: "scale(1.1)" }
                        : {};

                      if (
                        (year === 2021 && month === 1) ||
                        (year === thisYear &&
                          month > howManyMonthsSoFarThisYear)
                      ) {
                        return <div key={monthIndex} />;
                      }
                      let isCurentMonth = false;
                      if (
                        year === thisYear &&
                        month === howManyMonthsSoFarThisYear
                      ) {
                        isCurentMonth = true;
                      }

                      return (
                        <div
                          key={monthIndex}
                          className={`${styles.month} ${
                            isCurentMonth ? styles.currentMonth : ""
                          }`}
                          style={monthStyle}
                        ></div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarBlock;
