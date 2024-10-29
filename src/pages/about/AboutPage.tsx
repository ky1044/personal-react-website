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
    <div className="page-content">
      <NavBar />

      <div className="top-level-container black">
        <div
          className="narrow-vertical-container"
          style={{ textAlign: "center" }}
        >
          <h1>a little bit about myself</h1>
        </div>
      </div>
      <div className="top-level-container ">
        <div className="narrow-vertical-container">
          <AboutBlocks />
        </div>
      </div>
      <div className="top-level-container" style={{ marginTop: 100 }}>
        <div className="narrow-vertical-container">
          <EmojiProvider value={emojiHook}>
            <EmojiSection />
          </EmojiProvider>
        </div>
      </div>
      <div className="top-level-container" style={{ marginTop: 100 }}>
        <div className="narrow-vertical-container">
          <LinksSection />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
