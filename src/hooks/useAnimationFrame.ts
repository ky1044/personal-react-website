import { useEffect, useState } from "react";

const useAnimationFrame = ({ animationSpeed }: { animationSpeed: number }) => {
  const [animationFrame, setAnimationFrame] = useState(0);
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      setAnimationFrame((prevFrame) => prevFrame + deltaTime * animationSpeed);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [animationSpeed]);
  return { animationFrame };
};

export default useAnimationFrame;
