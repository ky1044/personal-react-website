/**
 * The wordmark.
 *
 * Expanded, it stacks Ken / Yoko / kawa and the trailing "Y" is pushed past
 * the right edge and clipped. Collapsed, the "Ken" slot narrows so that "Y"
 * tucks in beside it and the mark reads "Ken Y" on one line.
 *
 * VERTICAL — one line is `--nav-logo-line`, which is half the difference
 * between the two nav-bar heights (see tokens.css). Because the mark drops
 * exactly two lines as the bar loses exactly that much height twice over, it
 * stays centred in both states and its top edge never moves. Change either
 * nav height and this still holds; pick leading by eye instead and it breaks.
 *
 * HORIZONTAL — measured from the type, at 22px Jost 500 with 1.6px tracking:
 * "kawa" is the widest stacked row at 55px, and "Ken " is 50px.
 *
 * The mark sets its own type rather than inheriting the h1 display rules. It
 * is a fixed-size piece of Jost and must not move with the heading scale —
 * that inheritance is what made it fragile in the first place.
 */

const SIZE = 22; // type size, px
const PAD_X = 4;
const BORDER = 2;

const CONTENT_W = 56; // widest stacked row ("kawa") plus a hair
const Y_W = 16;
const KEN_SLOT_COLLAPSED = 50; // width of "Ken " so the "Y" sits beside it
// Clear the padding box too, otherwise a sliver of the "Y" stays visible.
const KEN_SLOT_EXPANDED = CONTENT_W + PAD_X;

const WIDTH_EXPANDED = CONTENT_W + PAD_X * 2 + BORDER * 2;
const WIDTH_COLLAPSED = KEN_SLOT_COLLAPSED + Y_W + PAD_X * 2 + BORDER * 2;

/** Height of a mark showing `rows` lines. No vertical padding: the leading
 *  already carries the breathing room, as it did in the original. */
const height = (rows: number) =>
  `calc(${rows} * var(--nav-logo-line) + ${BORDER * 2}px)`;

function Logo({ expanded }: { expanded: boolean }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header>
      <a
        onClick={scrollToTop}
        className="cursor-pointer inline-block"
        aria-label="Back to top"
      >
        <h1
          className="border-2 border-primary-blue text-primary-blue font-medium font-mark no-underline overflow-hidden transition-all"
          style={{
            width: expanded ? WIDTH_EXPANDED : WIDTH_COLLAPSED,
            height: expanded ? height(3) : height(1),
            paddingInline: PAD_X,
            fontSize: SIZE,
            lineHeight: "var(--nav-logo-line)",
            letterSpacing: "1.6px",
            fontStretch: "normal",
          }}
        >
          <div className="flex flex-row">
            <div
              className="shrink-0 transition-all"
              style={{
                width: expanded ? KEN_SLOT_EXPANDED : KEN_SLOT_COLLAPSED,
              }}
            >
              Ken
            </div>
            <div className="shrink-0">Y</div>
          </div>
          <div>Yoko</div>
          <div>kawa</div>
        </h1>
      </a>
    </header>
  );
}

export default Logo;
