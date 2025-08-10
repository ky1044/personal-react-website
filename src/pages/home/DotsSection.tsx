import React, { useEffect, useMemo, useRef, useState } from "react";

const DOT_SIZE = 3; // px
const DOT_GAP = 15; // px, space around each dot
const NUM_ROWS = 15;
const MIN_DOT_SCALE_FACTOR = 0.5;

const DotsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numCols, setNumCols] = useState(0);

  useEffect(() => {
    const calculateCols = () => {
      if (containerRef.current && containerRef.current.parentElement) {
        const availableWidth = containerRef.current.parentElement.offsetWidth;
        const effectiveDotWidth = DOT_SIZE + DOT_GAP;
        setNumCols(Math.floor((availableWidth - DOT_GAP) / effectiveDotWidth));
      }
    };

    calculateCols(); // Initial calculation

    let timeoutId: NodeJS.Timeout | null = null;
    const debouncedCalculateCols = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        calculateCols();
      }, 100); // 100ms debounce
    };

    window.addEventListener("resize", debouncedCalculateCols);
    return () => {
      window.removeEventListener("resize", debouncedCalculateCols);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []); // DOT_SIZE and DOT_GAP are constants, no need to include them as dependencies

  console.log({ numCols });

  const dots = useMemo(() => {
    const dotElements = [];
    const colsToRender = Math.max(0, numCols);

    for (let r = 0; r < NUM_ROWS; r++) {
      const normalizedY = r / (NUM_ROWS - 1) - 0.8;
      const cosineFactor = Math.cos(normalizedY * Math.PI);
      const scaleFactor =
        MIN_DOT_SCALE_FACTOR + (1.0 - MIN_DOT_SCALE_FACTOR) * cosineFactor;
      const currentDotScaledSize = DOT_SIZE * scaleFactor;

      for (let c = 0; c < colsToRender + 5; c++) {
        dotElements.push(
          <div
            key={`${r}-${c}`}
            className="bg-black rounded-full animate-wave origin-center m-[7.5px] will-change-transform will-change-opacity"
            style={{
              width: `${currentDotScaledSize}px`,
              height: `${currentDotScaledSize}px`,
              animationDelay: `${r * 0.2 + c * 0.1}s`,
            }}
          />
        );
      }
    }
    return dotElements;
  }, [numCols]);

  return (
    <div className="w-full overflow-hidden relative">
      <div
        ref={containerRef}
        className="grid justify-start items-center gap-0 w-fit animate-scroll-dots mx-auto will-change-transform"
        style={{
          gridTemplateColumns: `repeat(${Math.max(0, numCols) + 5}, ${
            DOT_SIZE + DOT_GAP
          }px)`,
        }}
      >
        {dots}
      </div>
    </div>
  );
};

export default React.memo(DotsSection);
