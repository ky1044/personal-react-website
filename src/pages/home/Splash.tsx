import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useScroll from "src/hooks/useScroll";
import GraphSvg from "./GraphSvg";
import HeroImage from "./HeroImage";
import HeroText from "./HeroText";

const Splash = () => {
  const [hightlightActive, setHighlightActive] = useState(false);
  const scrollHeight = useScroll();

  useEffect(() => {
    const element = document.getElementById("splash-header-text");
    const elementPosition = element?.getBoundingClientRect();
    if ((elementPosition?.bottom ?? 0) <= window.innerHeight) {
      setHighlightActive(true);
    } else if ((elementPosition?.bottom ?? 0) > window.innerHeight + 75) {
      setHighlightActive(false);
    }
  }, [scrollHeight]);

  return (
    <>
      <HeroText scrollHeight={scrollHeight} />
      <HeroImage scrollHeight={scrollHeight} />
      <div className="max-w-[1200px] mx-auto border-l border-r border-layout-divider relative">
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <GraphSvg />
          {/* <SplashSvg /> */}
          {/* <PeopleSvg /> */}
        </div>
        <div className="w-fit py-36 px-4 mx-auto z-3 relative">
          <div
            className="font-[Roboto_Flex] text-3xl sm:text-5xl lg:text-6xl font-semibold leading-normal sm:leading-[1.4] lg:leading-[1.6] sm:tracking-[1.2px]"
            id="splash-header-text"
          >
            approaching <br />
            <span className="text-primary-blue">software development</span>
            <br />
            with{" "}
            <span className="text-primary-blue relative">
              <motion.div
                className="bg-highlight-primary absolute top-[5px] bottom-[5px] sm:top-[14px] sm:bottom-[7px] left-0 right-[100%] z-0"
                animate={{
                  width: hightlightActive ? "100%" : 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
              />
              <span className="relative z-3">people</span>
            </span>{" "}
            in mind
          </div>
        </div>
      </div>
      <div className="w-screen border-t border-layout-divider relative left-1/2 -translate-x-1/2" />
    </>
  );
};

export default Splash;
