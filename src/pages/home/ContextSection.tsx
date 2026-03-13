import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";
import { animationVariants } from "src/consts/animation";
import useWindow from "src/hooks/useWindow";

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

const TILT_BASE = 6;
const SPRING_CONFIG = { stiffness: 300, damping: 20 };

function getMaxSpan(style: Record<string, string>): number {
  const span = (v: string) => {
    const parts = v.split("/");
    return parts.length === 2
      ? Math.abs(parseInt(parts[1]) - parseInt(parts[0]))
      : 1;
  };
  return Math.max(
    style.gridColumn ? span(style.gridColumn) : 1,
    style.gridRow ? span(style.gridRow) : 1,
  );
}

const SkillTile = ({
  skill,
  isMobile,
}: {
  skill: (typeof skills)[0];
  isMobile: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const activeStyle = (isMobile ? skill.mobileStyle : skill.style) as Record<
    string,
    string
  >;
  const maxSpan = getMaxSpan(activeStyle);
  const tiltMax = TILT_BASE * (3 / maxSpan);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, SPRING_CONFIG);
  const springRotateY = useSpring(rotateY, SPRING_CONFIG);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -tiltMax * 2);
    rotateY.set((x - 0.5) * tiltMax * 2);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group bg-[linear-gradient(180deg,var(--background-gradient-top),var(--background-gradient-bottom))] rounded-[12px] flex justify-center items-center text-center transition-[margin] duration-200 overflow-hidden m-1 hover:m-0`}
      style={{
        ...(isMobile ? skill.mobileStyle : skill.style),
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      variants={animationVariants.individualLarge}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {skill.img && (
        <img
          src={`${process.env.PUBLIC_URL}/tech/${skill.img}`}
          className="w-1/2 h-1/2 object-scale-down transition-[width,height] duration-200"
        />
      )}
      <div className="absolute bottom-[-20px] group-hover:bottom-[2px] transition-all duration-200 font-medium text-sm text-black">
        {skill.name}
      </div>
    </motion.div>
  );
};

const ContextSection = () => {
  const { isMobile } = useWindow();

  return (
    <div className="max-w-[1200px] mx-auto border-l border-r border-layout-divider">
      <div>
        <div className="flex flex-row justify-between text-primary-blue px-4 pt-24">
          <h1 className="text-primary-blue">TECH STACK</h1>
          <h1 className="text-background-site leading-none md:block hidden">
            技術
          </h1>
        </div>
        <div className="w-screen border-t border-layout-divider relative left-1/2 -translate-x-1/2" />
        <div className=" relative p-4">
          <h3 className="max-w-[700px]">
            I have experience in the full stack, but lately I&apos;m focused
            more on front-end development. Here are some of the languages and
            libraries I have experience with:
          </h3>
          <div className="mt-8 mx-auto w-full max-w-[900px] flex justify-center aspect-[5/7] sm:aspect-[5/3]">
            <div className="grid w-full sm:gap-[6px] sm:grid-cols-8 sm:grid-rows-5 grid-cols-5 grid-rows-7 gap-[2px]">
              {skills.map((skill) => (
                <SkillTile key={skill.name} skill={skill} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-screen border-t border-layout-divider relative left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
};

export default ContextSection;
