import { Row } from "antd";
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
        className={`max-w-[1200px] mx-auto mt-12 px-4 my-16`}
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
        <Row justify="space-between" align-items="baseline">
          <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
            KEN
          </h1>
          <h1
            className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] text-right max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]"
          >
            SOFTWARE
          </h1>
        </Row>
        <Row justify="space-between" align-items="baseline">
          <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
            YOKOKAWA
          </h1>
          <h1
            className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] text-right max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]"
          >
            DEV
          </h1>
        </Row>
      </div>
      <HeroImage scrollHeight={scrollHeight} />
      <div className="max-w-[1200px] mx-auto mt-12 px-4">
        <div className="w-fit my-24 mx-auto">
          <p
            className="font-[Roboto_Flex] text-[clamp(24px,4vw,64px)] font-semibold leading-normal tracking-[1.2px]"
            id="splash-header-text"
          >
            approaching <br />
            <span className="text-primary-blue">software development</span>
            <br />
            with{" "}
            <span className="text-primary-blue relative">
              people
              <motion.div
                className="bg-highlight-primary absolute top-[14px] bottom-[7px] left-0 right-[100%] -z-[1]"
                animate={{
                  width: hightlightActive ? "100%" : 0,
                  transition: {
                    duration: 0.5,
                  },
                }}
              />
            </span>{" "}
            in mind
          </p>
        </div>
      </div>
    </>
  );
};

export default Splash;
