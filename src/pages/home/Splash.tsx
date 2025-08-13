import { useEffect, useState } from "react";
import HeroImage from "./HeroImage";
import useScroll from "src/hooks/useScroll";
import { motion } from "framer-motion";

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
      <div
        className={`max-w-[1200px] mx-auto mt-12 px-4`}
        style={{
          background:
            "linear-gradient(45deg, #36b2ff 25%, #0079eb 40%, #0079eb 60%, #36b2ff 75%)",
          backgroundSize: "200% 100%",
          backgroundPositionX: scrollHeight > 5 ? "0%" : "100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transition: "background-position-x 0.7s",
        }}
      >
        <div className="flex flex-row justify-between items-baseline">
          <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
            KEN
          </h1>
          <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] text-right max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
            SOFTWARE
          </h1>
        </div>
        <div className="flex flex-row justify-between items-baseline">
          <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
            YOKOKAWA
          </h1>
          <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] text-right max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
            DEV
          </h1>
        </div>
      </div>
      <HeroImage scrollHeight={scrollHeight} />
      <div className="max-w-[1200px] mx-auto border-l border-r border-layout-divider ">
        <div className="w-fit py-36 px-4 mx-auto">
          <div
            className="font-[Roboto_Flex] text-3xl sm:text-5xl lg:text-6xl font-semibold leading-normal sm:leading-[1.4] lg:leading-[1.6] sm:tracking-[1.2px]"
            id="splash-header-text"
          >
            approaching <br />
            <span className="text-primary-blue">software development</span>
            <br />
            with{" "}
            <span className="text-primary-blue relative">
              <span className="relative z-[1]">people</span>
              <motion.div
                className="bg-highlight-primary absolute top-[5px] bottom-[5px] sm:top-[14px] sm:bottom-[7px] left-0 right-[100%]"
                animate={{
                  width: hightlightActive ? "100%" : 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
              />
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
