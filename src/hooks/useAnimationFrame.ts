import { useEffect, useState } from "react";

const useAnimationFrame = ({ animationSpeed }: { animationSpeed: number }) => {
  const [animationFrame, setAnimationFrame] = useState(0);
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      setAnimationFrame((prevFrame) => prevFrame + deltaTime * 0.03);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  return { animationFrame };
};

export default useAnimationFrame;
