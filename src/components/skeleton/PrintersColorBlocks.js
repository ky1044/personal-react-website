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
    <div className="flex gap-[3px]">
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex-grow h-5 w-5"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default PrintersColorBlocks;
