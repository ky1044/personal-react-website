import AboutBlocks from "./animation/AboutAnimationSection";
import { EmojiProvider } from "./emojiContext";
import AboutIconsSection from "./AboutIconsSection";
import useEmoji from "./useEmoji";
import LinksSection from "./LinksSection";
import Hr from "src/components/shared/Hr";

export const AboutPageTop = () => {
  const emojiHook = useEmoji();

  return (
    <>
      <div className="max-w-[1200px] mx-auto pt-16 sm:pt-36 pb-1 sm:pb-2 px-4">
        <div
          className="flex flex-col justify-between gap-2.5 max-w-[912px] mx-auto"
          style={{ textAlign: "center" }}
        >
          {/* The h1 rule sets leading-none, which is exactly the font size and
              so cannot hold a descender. That is right for the uppercase
              display headings, but this is the one lowercase one: at
              leading-none the "y" of "myself" dropped onto the rule below,
              and on mobile, where it wraps, into the line beneath it. */}
          <h1 className="leading-tight">a little bit about myself</h1>
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
    </>
  );
};

export const AboutPageBottom = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col justify-between gap-2.5 max-w-[1200px] mx-auto">
        <LinksSection />
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <>
      <AboutPageTop />
      <AboutPageBottom />
    </>
  );
};

export default AboutPage;
