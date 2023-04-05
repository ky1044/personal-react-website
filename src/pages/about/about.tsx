import { Row } from "antd";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "src/components/nav/NavBar";

const Emoji = ({ label, symbol, className }: any) => {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
    >
      {symbol}
    </span>
  );
};

const AboutPage = () => {
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
      <div style={{ marginTop: 100, marginBottom: 100 }}></div>

      <p>
        Hi there, my name is Ken Yokokawa. {"I'm"} {age} years old and live in
        New York City.
      </p>
      <p>
        Born in New York and having moved to Tokyo at the age of five, I spent
        most of my life in Japan. I moved back to New York for college. After
        graduating, I became a software engineer, working at Morgan Stanley and
        a startup called CertiK. I specialize in full-stack web development
        work, and am most familiar with React and Node.js.
      </p>
      <p>
        For fun, I like to run and cycle, listen to music, and take photography.
      </p>
      <div style={{ marginTop: 100, marginBottom: 100 }}></div>


      <h2>Some links</h2>
      <Row>
        <a href="mailto:kenyokokawa@gmail.com">
          <h2 className="logo">E-mail</h2>
        </a>
      </Row>
      <Row>
        <a href="https://github.com/ky1044">
          <h2 className="logo">GitHub</h2>
        </a>
      </Row>

      <Row>
        <a href="https://www.linkedin.com/in/ken-yokokawa/">
          <h2 className="logo">LinkedIn</h2>
        </a>
      </Row>

      <Row>
        <a href="https://www.strava.com/athletes/9966064">
          <h2 className="logo">Strava</h2>
        </a>
      </Row>
    </div>
  );
};

export default AboutPage;
