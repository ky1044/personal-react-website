import React, { useState } from "react";
import styles from "./CalendarBlock.module.css";
const CalendarBlock = ({ isActive }: { isActive: boolean }) => {
  const [today] = useState(new Date());
  const thisYear = today.getFullYear();
  const numYears = thisYear - 2020;
  const howManyMonthsSoFarThisYear = today.getMonth() + 1;

  const years = Array.from({ length: numYears }, (_, i) => i + 2021);

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
      {years.map((year, yearIndex) => {
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
      {/* <style>{`
        .container {
          position: absolute;
          width: 400%;
          display:grid:
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .year {
          // width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .month {
          width: 100%;
          height: 40px;
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 0px 5px rgba(0, 0, 0, 0.2);
        }
      `}</style> */}
    </div>
  );
};

export default CalendarBlock;
