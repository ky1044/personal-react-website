import React from "react";
import AboutBlocks from "./animation/AboutAnimationSection";
import { EmojiProvider } from "./emojiContext";
import AboutIconsSection from "./AboutIconsSection";
import useEmoji from "./useEmoji";
import LinksSection from "./LinksSection";
import Hr from "src/components/shared/Hr";

const AboutPage = () => {
  const emojiHook = useEmoji();

  return (
    <>
      <div className="max-w-[1200px] mx-auto mt-12 px-4">
        <div
          className="flex flex-col justify-between gap-2.5 max-w-[912px] mx-auto"
          style={{ textAlign: "center" }}
        >
          <h1>a little bit about myself</h1>
        </div>
      </div>
      <Hr />
      <div className="max-w-[1200px] mx-auto  ">
        <div className="flex flex-col justify-between max-w-[912px] mx-auto border-r border-l border-layout-divider">
          <AboutBlocks />
        </div>
      </div>
      <Hr />
      <div className="mx-auto">
        <div className="flex flex-col justify-between gap-2.5 max-w-[1200px] mx-auto">
          <EmojiProvider value={emojiHook}>
            <AboutIconsSection />
          </EmojiProvider>
        </div>
      </div>
      <Hr />
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-between gap-2.5 max-w-[1200px] mx-auto">
          <LinksSection />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
