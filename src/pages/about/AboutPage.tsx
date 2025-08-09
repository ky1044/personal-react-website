import React from "react";
import { NavBar } from "src/components/skeleton/NavBar/NavBar";
import AboutBlocks from "./animation/AboutAnimationSection";
import { Footer } from "src/components/skeleton/Footer";
import { EmojiProvider } from "./emojiContext";
import EmojiSection from "./EmojiSection";
import useEmoji from "./useEmoji";
import LinksSection from "./LinksSection";

const AboutPage = () => {
  const emojiHook = useEmoji();

  return (
    <div className="max-w-[1200px] mx-auto mt-12 px-4 pb-20 leading-snug">
      <NavBar />

      <div className="max-w-[1200px] mx-auto mt-12 px-4">
        <div
          className="flex flex-col justify-between gap-2.5 max-w-[820px] mx-auto"
          style={{ textAlign: "center" }}
        >
          <h1>a little bit about myself</h1>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-12 px-4 ">
        <div className="flex flex-col justify-between gap-2.5 max-w-[820px] mx-auto">
          <AboutBlocks />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-[100px] px-4" >
        <div className="flex flex-col justify-between gap-2.5 max-w-[820px] mx-auto">
          <EmojiProvider value={emojiHook}>
            <EmojiSection />
          </EmojiProvider>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-[100px] px-4" >
        <div className="flex flex-col justify-between gap-2.5 max-w-[820px] mx-auto">
          <LinksSection />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
