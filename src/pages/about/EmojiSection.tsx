import React, { useMemo } from "react";
import { useEmojiContext } from "./emojiContext";
import { EMOJI_MAPPING, Emojis } from "./emoji";
import styles from "./EmojiSection.module.css";

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
      <div className={styles.sidebarBlock} style={{ minHeight: 336 }}>
        <Emoji emojiKey={Emojis.NYC} />
        <Emoji emojiKey={Emojis.COLLEGE} />
        <Emoji emojiKey={Emojis.RUNNING} />
        <Emoji emojiKey={Emojis.MUSIC} />
      </div>
      <div className={styles.centerBlock}>
        <p className="p1" style={{ marginBottom: 40 }}>
          Hi there, my name is Ken. {"I'm"} {age} years old and live in{" "}
          <EmojiLabel emojiKey={Emojis.NYC} />.
        </p>
        <p className="p1" style={{ marginBottom: 40 }}>
          Born in New York and having moved to{" "}
          <EmojiLabel emojiKey={Emojis.TOKYO} /> at the age of five, I spent
          most of my life in Japan. I moved back to New York for{" "}
          <EmojiLabel emojiKey={Emojis.COLLEGE} />. After graduating, I became a{" "}
          <EmojiLabel emojiKey={Emojis.SOFTWARE_ENGINEER} />, working at Morgan
          Stanley, a startup called CertiK, and currently working for Book of
          the Month. I specialize in full-stack web development work, and am
          most familiar with React.js, React Native, and Node.js.
        </p>
        <p className="p1">
          For fun, I like <EmojiLabel emojiKey={Emojis.RUNNING} /> and{" "}
          <EmojiLabel emojiKey={Emojis.CYCLING} />, listening to{" "}
          <EmojiLabel emojiKey={Emojis.MUSIC} />, and taking{" "}
          <EmojiLabel emojiKey={Emojis.PHOTOGRAPHY} />.
        </p>
      </div>
      <div className={styles.sidebarBlock} style={{ minHeight: 336 }}>
        <Emoji emojiKey={Emojis.TOKYO} />
        <Emoji emojiKey={Emojis.SOFTWARE_ENGINEER} />
        <Emoji emojiKey={Emojis.CYCLING} />
        <Emoji emojiKey={Emojis.PHOTOGRAPHY} />
      </div>
    </div>
  );
};

export default EmojiSection;
