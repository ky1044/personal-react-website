const PrintersColorBlocks = () => {
  const colors = [
    "var(--primary-blue)",
    "var(--secondary-blue)",
    "var(--highlight-primary)",
    "var(--content-primary)",
    "var(--content-secondary)",
    "var(--content-tertiary)",
  ];

  return (
    <div className="flex gap-[2%] w-full">
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex-grow aspect-square "
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default PrintersColorBlocks;
