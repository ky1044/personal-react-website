import React from "react";

const HeroText = ({ scrollHeight }: { scrollHeight: number }) => {
  return (
    <div className={`max-w-[1200px] mx-auto mt-12 px-4 relative`}>
      <div className="flex flex-row justify-between items-stretch w-full">
        <div className="w-0 relative">
          <div
            className="absolute top-3 right-1  h-full"
            style={{
              writingMode: "vertical-rl",
            }}
          >
            <h1 className="text-background-site text-[3.5rem]">横川研</h1>
          </div>
        </div>

        <div
          className="w-full"
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
          <div
            className="flex flex-row justify-between items-baseline"
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
            <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
              KEN
            </h1>
            <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] text-right max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
              SOFTWARE
            </h1>
          </div>
          <div className="flex flex-row justify-between items-baseline mb-20">
            <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
              YOKOKAWA
            </h1>
            <h1 className="leading-none font-[Roboto_Flex,Arial] text-[96px] font-[650] tracking-[4.8px] text-right max-[960px]:text-[9.5vw] max-[960px]:tracking-[0.4vw]">
              DEV
            </h1>
          </div>
        </div>
        <div className="w-0 relative">
          <div
            className="absolute top-2 left-1  h-full"
            style={{
              writingMode: "vertical-rl",
            }}
          >
            <h1 className="text-background-site text-[1.8rem]">
              ソフトウェア
              <br />
              エンジニア
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
