import { Row } from "antd";
import { useMemo } from "react";
import { NavBar } from "src/components/nav/NavBar";
import { Emojis, EMOJI_MAPPING } from "./emoji";
import { EmojiProvider, useEmojiContext } from "./emojiContext";
import useEmoji from "./useEmoji";
import { links } from "./links";

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
      className={`emoji ${isHovered ? "hovered" : ""}`}
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
      className={`emoji-label ${isHovered ? "hovered" : ""}`}
    >
      {EMOJI_MAPPING[emojiKey].label}
    </span>
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
    <div>
      <NavBar />
      <div className="about-body">
        <EmojiProvider value={emojiHook}>
          <div style={{ marginTop: 100, marginBottom: 100 }}></div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="about-section-sidebar" style={{ minHeight: 336 }}>
              <Emoji emojiKey={Emojis.NYC} />
              <Emoji emojiKey={Emojis.COLLEGE} />
              <Emoji emojiKey={Emojis.RUNNING} />
              <Emoji emojiKey={Emojis.MUSIC} />
            </div>
            <div className="about-section-center">
              <p style={{ marginBottom: 40 }}>
                Hi there, my name is Ken Yokokawa. {"I'm"} {age} years old and
                live in <EmojiLabel emojiKey={Emojis.NYC} />.
              </p>
              <p style={{ marginBottom: 40 }}>
                Born in New York and having moved to{" "}
                <EmojiLabel emojiKey={Emojis.TOKYO} /> at the age of five, I
                spent most of my life in Japan. I moved back to New York for{" "}
                <EmojiLabel emojiKey={Emojis.COLLEGE} />. After graduating, I
                became a <EmojiLabel emojiKey={Emojis.SOFTWARE_ENGINEER} />,
                working at Morgan Stanley and a startup called CertiK. I
                specialize in full-stack web development work, and am most
                familiar with React and Node.js.
              </p>
              <p>
                For fun, I like <EmojiLabel emojiKey={Emojis.RUNNING} /> and{" "}
                <EmojiLabel emojiKey={Emojis.CYCLING} />, listening to{" "}
                <EmojiLabel emojiKey={Emojis.MUSIC} />, and taking{" "}
                <EmojiLabel emojiKey={Emojis.PHOTOGRAPHY} />.
              </p>
            </div>
            <div className="about-section-sidebar" style={{ minHeight: 336 }}>
              <Emoji emojiKey={Emojis.TOKYO} />
              <Emoji emojiKey={Emojis.SOFTWARE_ENGINEER} />
              <Emoji emojiKey={Emojis.CYCLING} />
              <Emoji emojiKey={Emojis.PHOTOGRAPHY} />
            </div>
          </div>
        </EmojiProvider>

        <div style={{ marginBottom: 100 }}></div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="about-section-sidebar" />
          <div className="about-section-center" style={{ flex: 12 }}>
            <h2>Some links</h2>
            {links.map((link, idx) => (
              <Row key={idx}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  <h2 className="logo about-link">{link.label}</h2>
                </a>
              </Row>
            ))}
          </div>
          <div className="about-section-sidebar" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
