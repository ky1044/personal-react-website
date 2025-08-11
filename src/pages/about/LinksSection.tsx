import { motion } from "framer-motion";
import { TextLink } from "src/components/shared/TextLink";
import { animationVariants } from "src/consts/animation";
import { links } from "./links";

const LinksSection = () => {
  return (
    <motion.div
      variants={animationVariants.containerQuick}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="border-l border-r border-layout-divider"
    >
      <motion.div variants={animationVariants.individual}>
        <div className="flex flex-row justify-between p-4 pt-12 border-b border-layout-divider items-end">
          <h2>
            Some <span className="text-lime-600">{"<ul>"}</span>s to wrap things
            up
          </h2>
          <h2 className="text-background-site leading-none sm:block hidden">
            〆に
          </h2>
        </div>
      </motion.div>
      <motion.div variants={animationVariants.individual}>
        <div className="flex justify-between flex-col  sm:flex-row sm:gap-4">
          <div className="flex flex-col gap-4 basis-1/3 border-r border-layout-divider p-4">
            <h3>Media I like</h3>
            <ul className="list-disc ml-6">
              <li>Dark Matter</li>
              <li>Smash Brothers</li>
              <li>Tomorrow, and Tomorrow, and Tomorrow</li>
              <li>Severance (both by Ling Ma and on Apple TV+)</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 basis-1/3 p-4">
            <h3>Go-to NYC spots</h3>
            <ul className="list-disc ml-6">
              <li>Soothr</li>
              <li>Four Horsemen</li>
              <li>Nubiani</li>
              <li>Tabetomo</li>
              <li>La Dong</li>
              <li>886</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 basis-1/3 sm:border-l border-layout-divider p-4">
            <h3>Links</h3>
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
      </motion.div>
    </motion.div>
  );
};

export default LinksSection;
