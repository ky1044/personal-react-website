import useWindow from "src/hooks/useWindow";
import styles from "./Context.module.css";
import { motion } from "framer-motion";
import { animationVariants } from "src/consts/animation";
const skills: {
  style: object;
  mobileStyle: object;
  name: string;
  img: string;
}[] = [
  {
    style: { gridColumn: "3/4", gridRow: "1/2" },
    mobileStyle: { gridColumn: "2/3", gridRow: "1/2" },
    name: "Java",
    img: "java.png",
  },
  {
    style: { gridColumn: "2/4", gridRow: "2/3" },
    mobileStyle: { gridColumn: "3/5", gridRow: "1/2" },
    name: "Node.js",
    img: "node.png",
  },
  {
    style: { gridColumn: "4/6", gridRow: "1/3" },
    mobileStyle: { gridColumn: "1/3", gridRow: "2/4" },
    name: "JavaScript",
    img: "javascript.webp",
  },
  {
    style: { gridColumn: "6/8", gridRow: "1/3" },
    mobileStyle: { gridColumn: "1/3", gridRow: "4/6" },
    name: "TypeScript",
    img: "ts.png",
  },
  {
    style: { gridColumn: "8/9", gridRow: "2/3" },
    mobileStyle: { gridColumn: "5/6", gridRow: "2/3" },
    name: "Svelte",
    img: "svelte.png",
  },
  {
    style: { gridColumn: "1/3", gridRow: "3/5" },
    mobileStyle: { gridColumn: "2/4", gridRow: "6/8" },
    name: "Python",
    img: "python.png",
  },
  {
    style: { gridColumn: "3/6", gridRow: "3/6" },
    mobileStyle: { gridColumn: "3/6", gridRow: "3/6" },
    name: "React",
    img: "react.png",
  },
  {
    style: { gridColumn: "6/8", gridRow: "3/4" },
    mobileStyle: { gridColumn: "3/5", gridRow: "2/3" },
    name: "Next.js",
    img: "next.png",
  },
  {
    style: { gridColumn: "6/8", gridRow: "4/5" },
    mobileStyle: { gridColumn: "4/6", gridRow: "6/7" },
    name: "DynamoDB",
    img: "dynamo.png",
  },
  {
    style: { gridColumn: "8/9", gridRow: "3/4" },
    mobileStyle: { gridColumn: "4/5", gridRow: "7/8" },

    name: "MySQL",
    img: "sql.png",
  },
];

const ContextSection = () => {
  const { isMobile } = useWindow();

  return (
    <div className="top-level-container">
      <div className={styles.container}>
        <h1 className="blue">TECH STACK</h1>
        <h3 className={styles.dek}>
          I have experience in the full stack, but lately I’m focused more on
          front-end development. Here are some of the languages and libraries I
          have experience with:
        </h3>
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className={styles.gridItem}
                style={{ ...(isMobile ? skill.mobileStyle : skill.style) }}
                variants={animationVariants.individualLarge}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {skill.img && (
                  <img
                    src={`${process.env.PUBLIC_URL}/tech/${skill.img}`}
                    className={styles.techImage}
                  />
                )}
                <div className={styles.skillText}>{skill.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextSection;
