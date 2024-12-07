import React, { useMemo } from "react";
import { useEmojiContext } from "./emojiContext";
import { EMOJI_MAPPING, Emojis } from "./emoji";
import styles from "./EmojiSection.module.css";
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
      className={`${styles.emoji} ${isHovered ? styles.hovered : ""}`}
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
      onMouseOver={() => onHover(emojiKey)}
      onMouseLeave={() => onHover(null)}
    >
      <div style={{ margin: "auto" }}>{symbol}</div>
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
      className={`${styles.emojiLabel} ${isHovered ? styles.hovered : ""}`}
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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <motion.div
        className={styles.sidebarBlock}
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
        className={styles.centerBlock}
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
        className={styles.sidebarBlock}
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
