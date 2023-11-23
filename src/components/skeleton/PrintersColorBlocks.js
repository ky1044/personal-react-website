import styles from "./PrintersColorBlocks.module.css";

const PrintersColorBlocks = () => {
  const colors = [
    "#000000",
    "#8B8B8B",
    "#F4F3F3",
    "#0179EB",
    "#1D90FF",
    "#00DEFF",
  ];

  return (
    <div className={styles.colorBarContainer}>
      {colors.map((color, index) => (
        <div
          key={index}
          className={styles.colorBlock}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default PrintersColorBlocks;
