import RevealCanvas from "./RevealCanvas";
import { createGraphScene } from "./graphScene";
import { createTopographyScene } from "./topographyScene";

/**
 * Section backgrounds. Each fills its nearest positioned ancestor, which
 * should be opaque (bg-background-site) so GridReveal's dots stay hidden;
 * see RevealCanvas for why.
 */

export const GraphBackground = () => (
  <RevealCanvas createScene={createGraphScene} />
);

export const TopographyBackground = ({
  maskSelector,
}: {
  maskSelector?: string;
}) => (
  <RevealCanvas
    createScene={createTopographyScene}
    maskSelector={maskSelector}
  />
);
