import styles from "./PrintersColorBlocks.module.css";

const PrintersColorBlocks = () => {
  const colors = [
    "var(--primary-blue",
    "var(--secondary-blue",
    "var(--highlight-primary",
    "var(--content-primary)",
    "var(--content-secondary)",
    "var(--content-tertiary",
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
