import React, { useMemo } from "react";
import { useEmojiContext } from "./emojiContext";
import { EMOJI_MAPPING, Emojis } from "./emoji";
import { motion } from "framer-motion";
import { animationVariants } from "src/consts/animation";

const Emoji = ({ emojiKey }: { emojiKey: Emojis }) => {
  const { onHover, hoveredKey } = useEmojiContext();

  const { label, symbol, isHovered } = useMemo(() => {
    return {
      label: EMOJI_MAPPING[emojiKey].label,
      symbol: EMOJI_MAPPING[emojiKey].symbol,
      isHovered: emojiKey === hoveredKey,
    };
  }, [emojiKey, hoveredKey]);

  return (
    <span
      className={`inline-flex items-center justify-center align-middle h-[84px] mx-[3px] transition-all duration-300 cursor-pointer ${
        isHovered ? "text-[64px]" : "text-[44px]"
      }`}
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
      onMouseOver={() => onHover(emojiKey)}
      onMouseLeave={() => onHover(null)}
    >
      {symbol}
    </span>
  );
};

const EmojiLabel = ({ emojiKey }: { emojiKey: Emojis }) => {
  const { onHover, hoveredKey } = useEmojiContext();
  const isHovered = useMemo(() => emojiKey === hoveredKey, [hoveredKey]);
  return (
    <span
      onMouseOver={() => onHover(emojiKey)}
      onMouseLeave={() => onHover(null)}
      className={`font-semibold cursor-pointer transition-colors duration-300 ${
        isHovered ? "text-secondary-blue" : "text-primary-blue"
      }`}
    >
      {EMOJI_MAPPING[emojiKey].label}
    </span>
  );
};

const EmojiSection = () => {
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
  return (
    <div className="flex flex-row">
      <motion.div
        className="min-w-[84px] flex flex-col justify-evenly"
        style={{ minHeight: 336 }}
        variants={animationVariants.containerQuick}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={animationVariants.individual}>
          <Emoji emojiKey={Emojis.NYC} />
        </motion.div>
        <motion.div variants={animationVariants.individual}>
          <Emoji emojiKey={Emojis.COLLEGE} />
        </motion.div>
        <motion.div variants={animationVariants.individual}>
          <Emoji emojiKey={Emojis.RUNNING} />
        </motion.div>
        <motion.div variants={animationVariants.individual}>
          <Emoji emojiKey={Emojis.MUSIC} />
        </motion.div>
      </motion.div>
      <motion.div
        className="flex flex-col justify-center grow"
        variants={animationVariants.containerQuick}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.p
          className="p1"
          style={{ marginBottom: 40 }}
          variants={animationVariants.individual}
        >
          Hi there, my name is Ken. {"I'm"} {age} years old and live in{" "}
          <EmojiLabel emojiKey={Emojis.NYC} />.
        </motion.p>
        <motion.p
          className="p1"
          style={{ marginBottom: 40 }}
          variants={animationVariants.individual}
        >
          Born in New York and having moved to{" "}
          <EmojiLabel emojiKey={Emojis.TOKYO} /> at the age of five, I spent
          most of my life in Japan. I moved back to New York for{" "}
          <EmojiLabel emojiKey={Emojis.COLLEGE} />. After graduating, I became a{" "}
          <EmojiLabel emojiKey={Emojis.SOFTWARE_ENGINEER} />, working at Morgan
          Stanley, a startup called CertiK, and currently working for Book of
          the Month. I specialize in full-stack web development work, and am
          most familiar with React.js, React Native, and Node.js.
        </motion.p>
        <motion.p className="p1" variants={animationVariants.individual}>
          For fun, I like <EmojiLabel emojiKey={Emojis.RUNNING} /> and{" "}
          <EmojiLabel emojiKey={Emojis.CYCLING} />, listening to{" "}
          <EmojiLabel emojiKey={Emojis.MUSIC} />, and taking{" "}
          <EmojiLabel emojiKey={Emojis.PHOTOGRAPHY} />.
        </motion.p>
      </motion.div>
      <motion.div
        className="min-w-[84px] flex flex-col justify-evenly"
        style={{ minHeight: 336 }}
        variants={animationVariants.containerQuick}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={animationVariants.individual}>
          <Emoji emojiKey={Emojis.TOKYO} />
        </motion.div>
        <motion.div variants={animationVariants.individual}>
          <Emoji emojiKey={Emojis.SOFTWARE_ENGINEER} />
        </motion.div>
        <motion.div variants={animationVariants.individual}>
          <Emoji emojiKey={Emojis.CYCLING} />
        </motion.div>
        <motion.div variants={animationVariants.individual}>
          <Emoji emojiKey={Emojis.PHOTOGRAPHY} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmojiSection;
