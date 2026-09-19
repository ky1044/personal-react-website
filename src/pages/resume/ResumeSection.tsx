import { motion } from "framer-motion";
import { Fragment } from "react";
import TechTag from "src/components/shared/TechTag";
import { animationVariants } from "src/consts/animation";
import { formatMonth } from "./formatMonth";
import { RESUME } from "./resumeData";

/**
 * Experience, set as a spec sheet: a mono date column right-aligned against a
 * per-entry rule, small uppercase field labels, and numbered bullets — the
 * same vocabulary as the project cards.
 */

const LABEL =
  "font-mono text-2xs uppercase tracking-wide text-content-tertiary-light leading-none";
const DATE = "font-mono text-sm tabular-nums whitespace-nowrap leading-tight";

/** The blue timeline rail and its node. */
const Rail = ({ isLast }: { isLast: boolean }) => (
  <motion.div
    className={`w-[6px] relative ${
      isLast
        ? "bg-[linear-gradient(180deg,rgb(30,144,255)_65%,rgba(30,144,255,0)_90%)]"
        : "bg-primary-blue"
    }`}
    variants={animationVariants.panDown}
  >
    <div className="w-6 h-6 rounded-full border-[5px] border-solid border-primary-blue bg-background-primary absolute left-[-9px] top-[-1px]" />
  </motion.div>
);

export default function ResumeSection() {
  return (
    <motion.div
      className="grid w-full grid-cols-[24px_1fr] sm:grid-cols-[24px_9rem_1fr]"
      variants={animationVariants.containerQuick}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {RESUME.map((role, i) => {
        const from = role.from && formatMonth(role.from);
        const to = role.to && formatMonth(role.to);
        return (
          <Fragment key={role.title + role.organization}>
            <Rail isLast={i === RESUME.length - 1} />
            <motion.span
              variants={animationVariants.introduceDown}
              className="grid col-start-2 col-end-[-1] [grid-template-columns:subgrid]"
            >
              {/* date column, right-aligned against the rule */}
              <div className="hidden sm:block pb-10 pl-4 pr-4 text-right">
                {/* Two auto columns keep the labels aligned with each other
                    and the dates aligned with each other; items-baseline sits
                    each small label on its date's baseline. An entry may carry
                    only an end date — a degree is conferred, not worked
                    through — and still lines up with the rest. */}
                <div
                  className="grid grid-cols-[auto_auto] gap-x-2 gap-y-1 justify-end items-baseline"
                  /* The two cells already start at the same y — what differs
                     is how a 14px mono glyph and a fluid Roboto Flex glyph sit
                     inside their own line boxes, which leaves the date cap
                     ~2px high at the top of the title's range and flush at the
                     bottom of it. This nudge closes that, scaled off the same
                     clamp the title uses so it holds at every width. Optical,
                     not exact: the mono stack resolves differently per OS. */
                  style={{ marginTop: "calc((var(--text-h3) - 1.125rem) * 0.32)" }}
                >
                  {from && (
                    <>
                      <span className={LABEL}>from</span>
                      <span className={DATE}>{from}</span>
                    </>
                  )}
                  {to && (
                    <>
                      <span className={LABEL}>until</span>
                      <span className={DATE}>{to}</span>
                    </>
                  )}
                </div>
                <p className="font-mono text-xs uppercase tracking-wide text-content-secondary leading-snug mt-3">
                  {role.location}
                </p>
              </div>

              {/* The rule sits on this inner element rather than the padded
                  wrapper, so each entry gets its own and they don't join into
                  one continuous line. */}
              <div className="pb-10 min-w-0">
                <div className="sm:pl-5 sm:border-l sm:border-solid sm:border-content-tertiary">
                  <h3 className="leading-tight">
                    {role.title}
                    <span className="text-content-tertiary-light font-normal">
                      {" "}
                      /{" "}
                    </span>
                    <span className="text-primary-blue">
                      {role.organization}
                    </span>
                  </h3>

                  {role.priorTitle && (
                    <p className={`${LABEL} mt-1.5`}>
                      previously {role.priorTitle.title} · until{" "}
                      {formatMonth(role.priorTitle.until)}
                    </p>
                  )}

                  <div className="sm:hidden font-mono text-xs text-content-secondary mt-1 tabular-nums">
                    {[from, to].filter(Boolean).join(" – ")} · {role.location}
                  </div>

                  <ul className="mt-3 flex flex-col gap-1.5 max-w-[66ch]">
                    {role.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="grid grid-cols-[1.75rem_1fr] items-baseline text-sm text-content-primary"
                      >
                        <span className="font-mono text-2xs text-content-tertiary-light tabular-nums select-none">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {role.tech && (
                    <div className="flex flex-row flex-wrap gap-1 mt-3">
                      {role.tech.map((tech, idx) => (
                        <TechTag name={tech} key={tech + idx} size="sm" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.span>
          </Fragment>
        );
      })}
    </motion.div>
  );
}
