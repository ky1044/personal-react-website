import useScroll from "src/hooks/useScroll";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export function NavBar() {
  const scrollHeight = useScroll();

  const isNavBarExpanded = scrollHeight < 30;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 mx-auto z-10 bg-background-veil backdrop-blur-[30px] border-b border-layout-divider shadow-1">
        <div
          className={`flex flex-row justify-between items-center transition-all w-[min(100%-2rem,1200px)] overflow-hidden m-auto ${
            isNavBarExpanded
              ? "h-[var(--nav-height-expanded)]"
              : "h-[var(--nav-height)]"
          }`}
        >
          {/* Pinned to the top of the bar rather than centred, so the
              wordmark grows and shrinks downward from a fixed edge. */}
          <div
            className="self-start"
            style={{ paddingTop: "var(--nav-logo-top)" }}
          >
            <Logo expanded={isNavBarExpanded} />
          </div>
          <NavLinks expanded={isNavBarExpanded} />
        </div>
      </div>
      <div style={{ height: "var(--nav-height-expanded)" }} />
    </>
  );
}
