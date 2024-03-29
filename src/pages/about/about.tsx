import { Row } from "antd";
import { useMemo } from "react";
import { NavBar } from "src/components/skeleton/NavBar/NavBar";
import { Emojis, EMOJI_MAPPING } from "./emoji";
import { EmojiProvider, useEmojiContext } from "./emojiContext";
import useEmoji from "./useEmoji";
import { links } from "./links";
import styles from "./About.module.css";
import { TextLink } from "src/components/shared/TextLink";

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

const BusinessCard = () => {
  const { yoeText, moeText } = useMemo(() => {
    const today = new Date();
    const startDate = new Date("02/01/2021");
    let yoe = today.getFullYear() - startDate.getFullYear();
    const moe = today.getMonth() - startDate.getMonth();
    const yoeText = `${yoe} years`;
    let moeText = null;
    if (moe > 1) {
      moeText = ` (*and ${moe} months) `;
    } else if (moe === 1) {
      moeText = " (*and 1 month) ";
    }
    return { yoeText, moeText };
  }, []);

  return (
    <div className={styles.businessCardWrapper}>
      <p>let me introduce myself</p>
      <div className={styles.businessCard}>
        <h3 className={styles.businessCardText}> Ken Yokokawa</h3>
        <div className={styles.businessCardPosition}>
          <span>
            <p className={styles.businessCardText}>Software Engineer</p>
          </span>
          <span>
            <p className={styles.businessCardText}>@ Book of the Month</p>
          </span>
        </div>
        <div>
          <p className={`${styles.businessCardText} p2`}>
            <i>
              {yoeText} {moeText && <span className="p3">{moeText}</span>}of
              industry experience
            </i>
          </p>
        </div>
        <div>
          <p className={`${styles.businessCardText} p2`}>
            kenyokokawa@gmail.com
          </p>
        </div>
        <div>
          <p className={`${styles.businessCardText} p2`}>New York, NY</p>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const emojiHook = useEmoji();
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
    <div className="page">
      <div className="page-content">
        <NavBar />
        <div className="top-level-container">
          <div className={styles.body}>
            <EmojiProvider value={emojiHook}>
              <div style={{ marginBottom: 100 }}></div>
              <BusinessCard />
              <div style={{ marginBottom: 100 }}></div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className={styles.sidebarBlock} style={{ minHeight: 336 }}>
                  <Emoji emojiKey={Emojis.NYC} />
                  <Emoji emojiKey={Emojis.COLLEGE} />
                  <Emoji emojiKey={Emojis.RUNNING} />
                  <Emoji emojiKey={Emojis.MUSIC} />
                </div>
                <div className={styles.centerBlock}>
                  <p className="p1" style={{ marginBottom: 40 }}>
                    Hi there, my name is Ken. {"I'm"} {age} years old and live
                    in <EmojiLabel emojiKey={Emojis.NYC} />.
                  </p>
                  <p className="p1" style={{ marginBottom: 40 }}>
                    Born in New York and having moved to{" "}
                    <EmojiLabel emojiKey={Emojis.TOKYO} /> at the age of five, I
                    spent most of my life in Japan. I moved back to New York for{" "}
                    <EmojiLabel emojiKey={Emojis.COLLEGE} />. After graduating,
                    I became a{" "}
                    <EmojiLabel emojiKey={Emojis.SOFTWARE_ENGINEER} />, working
                    at Morgan Stanley, a startup called CertiK, and currently
                    working for Book of the Month. I specialize in full-stack
                    web development work, and am most familiar with React.js,
                    React Native, and Node.js.
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
            </EmojiProvider>

            <div style={{ marginBottom: 100 }}></div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className={styles.sidebarBlock} />
              <div className={styles.centerBlock} style={{ flex: 12 }}>
                <div className={styles.linksContainer}>
                  <h2>Some links</h2>
                  {links.map((link, idx) => (
                    <TextLink
                      text={link.label}
                      link={link.href}
                      linkType="external"
                      key={idx}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.sidebarBlock} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
