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
    >
      <motion.div variants={animationVariants.individual}>
        <h2>{"Some <ul>s to wrap things up"}</h2>
      </motion.div>
      <motion.div variants={animationVariants.individual}>
        <div className="flex gap-4 justify-between mt-6 max-[680px]:flex-col max-[680px]:gap-12">
          <div className="flex flex-col gap-4 basis-1/3">
            <h3>Media I like</h3>
            <ul>
              <li>Dark Matter</li>
              <li>Smash Brothers</li>
              <li>Tomorrow, and Tomorrow, and Tomorrow</li>
              <li>Severance (both by Ling Ma and on Apple TV+)</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 basis-1/3">
            <h3>Go-to NYC spots</h3>
            <ul>
              <li>Soothr</li>
              <li>Four Horsemen</li>
              <li>Nubiani</li>
              <li>Tabetomo</li>
              <li>La Dong</li>
              <li>886</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 basis-1/3">
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
