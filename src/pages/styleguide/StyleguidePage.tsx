import ShinyButton from "src/components/shared/ShinyButton";
import TechTag from "src/components/shared/TechTag";
import { TextLink } from "src/components/shared/TextLink";
import ProjectCard from "src/components/projects/ProjectCard";
import { projects } from "src/components/projects/projects";
import {
  COLOR_PRIMITIVES,
  COLOR_SEMANTIC,
  DURATION_TOKENS,
  EASING_TOKENS,
  ELEVATION_TOKENS,
  LAYOUT_TOKENS,
  NAMED_SPACE_TOKENS,
  RADIUS_TOKENS,
  SCALE_TOKENS,
  SPACE_TOKENS,
  TYPE_SPECIMENS,
} from "./tokens";
import {
  FullBleedRule,
  Rails,
  Section,
  SubHead,
  SwatchGrid,
  TokenName,
  TokenTable,
} from "./parts";
import useTokenValue from "./useTokenValue";

const SpaceRow = ({ token }: { token: string }) => {
  const read = useTokenValue();
  const value = read(token);
  return (
    <div className="flex items-center gap-4 py-1">
      <span className="text-sm font-medium w-24 shrink-0">
        {token.replace(/^--space-/, "")}
      </span>
      <div
        className="h-4 bg-primary-blue shrink-0"
        style={{ width: value }}
      />
      <span className="text-xs text-content-secondary">{value}</span>
    </div>
  );
};

const RadiusSample = ({ token }: { token: string }) => {
  const read = useTokenValue();
  const value = read(token);
  return (
    <div className="flex flex-col gap-1 items-start">
      <div
        className="w-full h-16 bg-background-tertiary border border-layout-divider"
        style={{ borderRadius: value }}
      />
      <span className="text-xs font-medium">
        {token.replace(/^--radius-/, "")}
      </span>
      <span className="text-2xs text-content-secondary">{value}</span>
    </div>
  );
};

const ElevationSample = ({ token }: { token: string }) => {
  const read = useTokenValue();
  return (
    <div className="flex flex-col gap-2 items-start bg-background-tertiary p-4">
      <div
        className="w-full h-20 bg-background-primary border border-layout-divider"
        style={{ boxShadow: read(token) }}
      />
      <span className="text-xs font-medium">
        {token.replace(/^--elevation-/, "")}
      </span>
    </div>
  );
};

const MotionSample = ({ token }: { token: string }) => {
  const read = useTokenValue();
  const value = read(token);
  return (
    <div className="group flex items-center gap-4 py-2 cursor-pointer">
      <span className="text-sm font-medium w-20 shrink-0">
        {token.replace(/^--duration-/, "").replace(/^--ease-/, "")}
      </span>
      <div className="relative flex-1 h-4 bg-background-tertiary overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full w-8 bg-primary-blue transition-transform group-hover:translate-x-[calc(100%*4)]"
          style={
            token.startsWith("--duration")
              ? { transitionDuration: value, transitionTimingFunction: "var(--ease-out)" }
              : { transitionDuration: "var(--duration-slow)", transitionTimingFunction: value }
          }
        />
      </div>
      <span className="text-xs text-content-secondary w-40 shrink-0 text-right break-all">
        {value}
      </span>
    </div>
  );
};

const TypeSpecimen = ({
  spec,
}: {
  spec: (typeof TYPE_SPECIMENS)[number];
}) => {
  const read = useTokenValue();
  const Tag = spec.element;
  return (
    <div className="py-4 border-t border-layout-divider first:border-t-0">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-content-secondary">
          {spec.label}
        </span>
        <TokenName name={spec.token} />
        <span className="text-2xs text-content-secondary">
          {read(spec.token)}
        </span>
      </div>
      <Tag>{spec.sample}</Tag>
    </div>
  );
};

const StyleguidePage = () => {
  const showcaseProject = projects[0];

  return (
    <div>
      {/* --- Masthead ---------------------------------------------------- */}
      <Rails>
        <div className="px-4 pt-12 pb-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-content-secondary">
            Design system
          </span>
          <h1 className="text-primary-blue mt-2">KEN YOKOKAWA</h1>
          <p className="max-w-[64ch] mt-4 text-content-secondary">
            A living reference. Every value on this page is read from{" "}
            <code className="text-content-primary">src/style/tokens.css</code>{" "}
            at runtime, and every component is the same one the site renders —
            so this page cannot go stale. Flip the theme in the nav to see both
            palettes.
          </p>
        </div>
      </Rails>
      <FullBleedRule />

      <Rails>
        {/* --- Color ---------------------------------------------------- */}
        <Section
          title="COLOR"
          jp="色"
          intro="One blue, one neutral ramp, and nothing else. Restraint is the point: the accent only ever means “this is interactive or this is me”."
        >
          <SubHead
            title="Primitives"
            description="Raw scale values. Components never reference these directly — they go through the semantic layer below, which is what lets the theme flip."
          />
          {COLOR_PRIMITIVES.map((group) => (
            <div key={group.title} className="mb-8">
              <SubHead title={group.title} description={group.description} />
              <SwatchGrid tokens={group.tokens} />
            </div>
          ))}

          <div className="border-t border-layout-divider pt-8 mt-4">
            <SubHead
              title="Semantic"
              description="What a color means, not what it is. These are the only color tokens a component should use."
            />
            {COLOR_SEMANTIC.map((group) => (
              <div key={group.title} className="mb-8">
                <SubHead title={group.title} description={group.description} />
                <SwatchGrid tokens={group.tokens} />
              </div>
            ))}
          </div>
        </Section>

        {/* --- Typography ------------------------------------------------ */}
        <Section
          title="TYPE"
          jp="文字"
          intro="Roboto Flex for display — wide, stretched, confident. Libre Franklin for body. Jost for the wordmark only."
        >
          <SubHead
            title="Specimens"
            description="Headings are fluid clamps, so they need no breakpoint overrides — drag the window and watch them scale."
          />
          <div className="mb-10">
            {TYPE_SPECIMENS.map((spec) => (
              <TypeSpecimen key={spec.token} spec={spec} />
            ))}
          </div>
          {SCALE_TOKENS.map((group) => (
            <div key={group.title} className="mb-8">
              <SubHead title={group.title} description={group.description} />
              <TokenTable tokens={group.tokens} />
            </div>
          ))}
        </Section>

        {/* --- Space & shape --------------------------------------------- */}
        <Section
          title="SPACE"
          jp="間"
          intro="A 4px rhythm, mirroring Tailwind's scale so the utility and the token always agree."
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <SubHead title="Scale" />
              <div>
                {SPACE_TOKENS.map((t) => (
                  <SpaceRow key={t} token={t} />
                ))}
              </div>
              <div className="mt-6">
                <SubHead
                  title="Named steps"
                  description="The page's vertical rhythm, so section padding is a decision made once."
                />
                <TokenTable tokens={NAMED_SPACE_TOKENS} />
              </div>
            </div>
            <div>
              <SubHead
                title="Radius"
                description="The grid is square. Radius is reserved for a short list: tags and buttons (pill), the tech-stack tiles and the project stack drawer. Nothing else rounds."
              />
              <div className="grid grid-cols-3 gap-3">
                {RADIUS_TOKENS.map((t) => (
                  <RadiusSample key={t} token={t} />
                ))}
              </div>
              <div className="mt-6">
                <SubHead
                  title="Elevation"
                  description="Used sparingly — the site builds depth from hairlines, not shadows."
                />
                <div className="grid grid-cols-2 gap-3">
                  {ELEVATION_TOKENS.map((t) => (
                    <ElevationSample key={t} token={t} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* --- Motion ----------------------------------------------------- */}
        <Section
          title="MOTION"
          jp="動き"
          intro="Hover to play each one. Durations are short on purpose: motion should confirm an action, not perform."
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <SubHead title="Duration" />
              {DURATION_TOKENS.map((t) => (
                <MotionSample key={t} token={t} />
              ))}
            </div>
            <div>
              <SubHead title="Easing" />
              {EASING_TOKENS.map((t) => (
                <MotionSample key={t} token={t} />
              ))}
            </div>
          </div>
          <p className="text-sm text-content-secondary mt-6 max-w-[68ch]">
            Under <code>prefers-reduced-motion</code> every duration token
            collapses to 1ms, so the whole site goes still without a single
            component needing to know about it.
          </p>
        </Section>

        {/* --- Components -------------------------------------------------- */}
        <Section
          title="COMPONENTS"
          jp="部品"
          intro="Rendered from the same source the site uses. If one changes there, it changes here."
        >
          <div className="mb-10">
            <SubHead
              title="TechTag"
              description="Border color is keyed to the technology's own brand. Two sizes; the small one takes an optional glow inside the project stack drawer."
            />
            <div className="flex flex-wrap gap-2 items-center">
              {["React.js", "TypeScript", "Postgres", "Tailwind CSS"].map(
                (t) => (
                  <TechTag key={t} name={t} />
                )
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center mt-3">
              {["Next.js App Router", "drizzle ORM", "Clerk"].map((t) => (
                <TechTag key={t} name={t} size="sm" hasGlow />
              ))}
            </div>
          </div>

          <div className="mb-10">
            <SubHead
              title="TextLink"
              description="The underline wipes left-to-right on hover and the icon nudges in the direction it will take you. The whole link vocabulary is these three types."
            />
            <div className="flex flex-wrap gap-8">
              <TextLink text="Internal" linkType="internal" />
              <TextLink text="External" linkType="external" />
              <TextLink text="Download" linkType="download" />
            </div>
          </div>

          <div className="mb-10">
            <SubHead
              title="ShinyButton"
              description="The one filled control. A cursor-tracking highlight rides the gradient; reserve it for the single most important action on a screen."
            />
            <div className="flex flex-wrap gap-4 items-center">
              <ShinyButton text="Small" size="sm" />
              <ShinyButton text="Medium" size="md" />
              <ShinyButton text="Large" size="lg" />
            </div>
          </div>

          <div className="mb-10">
            <SubHead
              title="Section header"
              description="Every section opens the same way: blue uppercase display type on the left, its Japanese counterpart on the right in the page color — legible only as texture when it catches the light."
            />
            <div className="border border-layout-divider overflow-hidden">
              <div className="flex flex-row justify-between items-baseline px-4 py-6 bg-background-site">
                <h1 className="text-primary-blue">PROJECTS</h1>
                <h1 className="text-background-site leading-none">
                  プロジェクト
                </h1>
              </div>
            </div>
          </div>

          {showcaseProject && (
            <div>
              <SubHead
                title="ProjectCard"
                description="A spec sheet, not a marketing card: labelled fields, dashed internal rules, and a stack drawer that slides out on hover."
              />
              <div className="max-w-[560px]">
                <ProjectCard project={showcaseProject} />
              </div>
            </div>
          )}
        </Section>

        {/* --- Layout ------------------------------------------------------ */}
        <Section
          title="LAYOUT"
          jp="骨格"
          intro="A 1200px measure with visible rails. Section rules break full-bleed past those rails — that tension between the contained column and the edge-to-edge line is the site's signature."
        >
          <TokenTable tokens={LAYOUT_TOKENS} />
          <div className="mt-8 relative border border-layout-divider p-6 overflow-hidden">
            <div className="absolute inset-y-0 left-10 border-l border-primary-blue/50" />
            <div className="absolute inset-y-0 right-10 border-r border-primary-blue/50" />
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-primary-blue/50" />
            <p className="relative text-sm text-content-secondary text-center py-8">
              rails hold the content — rules cross them
            </p>
          </div>
        </Section>
      </Rails>
      <FullBleedRule />
    </div>
  );
};

export default StyleguidePage;
