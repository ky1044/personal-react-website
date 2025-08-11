import React, { useMemo } from "react";
import { useEmojiContext } from "./emojiContext";
import { EMOJI_MAPPING, Emojis } from "./emoji";
import { motion } from "framer-motion";
import { animationVariants } from "src/consts/animation";
import NycSvg from "src/components/assets/about/NycSvg";
import TokyoSvg from "src/components/assets/about/TokyoSvg";
import CollegeSvg from "src/components/assets/about/CollegeSvg";
import SoftwareEngineerSvg from "src/components/assets/about/SoftwareEngineerSvg";
import RunningSvg from "src/components/assets/about/RunningSvg";
import CyclingSvg from "src/components/assets/about/CyclingSvg";
import MusicSvg from "src/components/assets/about/MusicSvg";
import PhotographySvg from "src/components/assets/about/PhotographySvg";

const ORDERED_EMOJIS: Emojis[] = [
  Emojis.NYC,
  Emojis.TOKYO,
  Emojis.COLLEGE,
  Emojis.SOFTWARE_ENGINEER,
  Emojis.RUNNING,
  Emojis.CYCLING,
  Emojis.MUSIC,
  Emojis.PHOTOGRAPHY,
];

const getNumberByEmoji = (emojiKey: Emojis): number =>
  ORDERED_EMOJIS.indexOf(emojiKey) + 1;

const EmojiToSvg: Record<Emojis, React.ComponentType> = {
  [Emojis.NYC]: NycSvg,
  [Emojis.TOKYO]: TokyoSvg,
  [Emojis.COLLEGE]: CollegeSvg,
  [Emojis.SOFTWARE_ENGINEER]: SoftwareEngineerSvg,
  [Emojis.RUNNING]: RunningSvg,
  [Emojis.CYCLING]: CyclingSvg,
  [Emojis.MUSIC]: MusicSvg,
  [Emojis.PHOTOGRAPHY]: PhotographySvg,
};

const AboutIcon = ({ emojiKey }: { emojiKey: Emojis }) => {
  const { onHover, hoveredKey } = useEmojiContext();

  const { isHovered } = useMemo(() => {
    return {
      isHovered: emojiKey === hoveredKey,
    };
  }, [emojiKey, hoveredKey]);

  const number = useMemo(() => getNumberByEmoji(emojiKey), [emojiKey]);

  return (
    <div
      className={`relative aspect-[1/1] mx-[3px] bg-background-tertiary cursor-pointer `}
      onMouseOver={() => onHover(emojiKey)}
      onMouseLeave={() => onHover(null)}
    >
      <span
        className={`absolute right-[-8px]  top-[-12px] text-[28px] font-bold text-content-primary transition-all duration-300 ${
          isHovered ? "text-primary-blue" : "text-content-primary"
        }`}
      >
        {number}
      </span>
      {(() => {
        const SvgComponent = EmojiToSvg[emojiKey];
        return <SvgComponent />;
      })()}
    </div>
  );
};

const AboutIconLabel = ({ emojiKey }: { emojiKey: Emojis }) => {
  const { onHover, hoveredKey } = useEmojiContext();
  const isHovered = useMemo(
    () => emojiKey === hoveredKey,
    [hoveredKey, emojiKey]
  );
  const number = useMemo(() => getNumberByEmoji(emojiKey), [emojiKey]);
  return (
    <span
      onMouseOver={() => onHover(emojiKey)}
      onMouseLeave={() => onHover(null)}
      className={`font-semibold cursor-pointer`}
    >
      {EMOJI_MAPPING[emojiKey].label}
      <sup
        className={`text-[13px] inline-block w-[6px] align-super text-content-primary transition-all duration-300 inline-block ${
          isHovered ? "text-primary-blue text-[16px] " : "text-content-primary "
        }`}
      >
        {number}
      </sup>
    </span>
  );
};

const AboutIconsSection = () => {
  const age = useMemo(() => {
    const today = new Date();
    const birthDate = new Date("07/16/1998");
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }, []);
  const emojiList = [
    {
      emojiKey: Emojis.NYC,
      desktopPosition: "left",
    },
    {
      emojiKey: Emojis.TOKYO,
      desktopPosition: "right",
    },
    {
      emojiKey: Emojis.COLLEGE,
      desktopPosition: "left",
    },
    {
      emojiKey: Emojis.SOFTWARE_ENGINEER,
      desktopPosition: "right",
    },
    {
      emojiKey: Emojis.RUNNING,
      desktopPosition: "left",
    },
    {
      emojiKey: Emojis.CYCLING,
      desktopPosition: "right",
    },
    {
      emojiKey: Emojis.MUSIC,
      desktopPosition: "left",
    },
    {
      emojiKey: Emojis.PHOTOGRAPHY,
      desktopPosition: "right",
    },
  ] as const;

  return (
    <div className="flex flex-row">
      <div
        className="min-w-[96px] md:min-w-[144px] flex flex-col justify-between gap-4 border-l  border-layout-divider px-2 py-4 md:px-4 md:py-6"
        style={{ minHeight: 360 }}
      >
        {emojiList.map((emoji) => (
          <motion.div
            key={emoji.emojiKey}
            variants={animationVariants.individual}
            className={`${
              emoji.desktopPosition === "right" ? "block md:hidden" : ""
            }`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <AboutIcon emojiKey={emoji.emojiKey} />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex flex-col justify-center grow text-[24px] max-w-[1200px] border-r border-l border-layout-divider p-2 sm:p-8"
        variants={animationVariants.containerQuick}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.p
          style={{ marginBottom: 40 }}
          variants={animationVariants.individual}
        >
          Hi there, my name is Ken. {"I'm"} {age} years old and live in{" "}
          <AboutIconLabel emojiKey={Emojis.NYC} />.
        </motion.p>
        <motion.p
          style={{ marginBottom: 40 }}
          variants={animationVariants.individual}
        >
          Born in New York and having moved to{" "}
          <AboutIconLabel emojiKey={Emojis.TOKYO} /> at the age of five, I spent
          most of my life in Japan. I moved back to New York for{" "}
          <AboutIconLabel emojiKey={Emojis.COLLEGE} />. After graduating, I
          became a <AboutIconLabel emojiKey={Emojis.SOFTWARE_ENGINEER} />,
          working at Morgan Stanley, a startup called CertiK, and currently
          working for Book of the Month. I specialize in full-stack web
          development work, and am most familiar with React.js, React Native,
          and Node.js.
        </motion.p>
        <motion.p variants={animationVariants.individual}>
          For fun, I like <AboutIconLabel emojiKey={Emojis.RUNNING} /> and{" "}
          <AboutIconLabel emojiKey={Emojis.CYCLING} />, listening to{" "}
          <AboutIconLabel emojiKey={Emojis.MUSIC} />, and taking{" "}
          <AboutIconLabel emojiKey={Emojis.PHOTOGRAPHY} />.
        </motion.p>
      </motion.div>
      <div
        className="min-w-[96px] md:min-w-[144px] flex-col justify-between items-end  gap-4 border-r border-layout-divider p-2 py-4 flex hidden md:flex  md:px-4 md:py-6"
        style={{ minHeight: 360 }}
      >
        {emojiList
          .filter((emoji) => emoji.desktopPosition === "right")
          .map((emoji) => (
            <motion.div
              key={emoji.emojiKey}
              variants={animationVariants.individual}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <AboutIcon emojiKey={emoji.emojiKey} />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default AboutIconsSection;
