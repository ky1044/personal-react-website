import useScroll from "src/hooks/useScroll";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export function NavBar() {
  const scrollHeight = useScroll();

  const isNavBarExpanded = scrollHeight < 30;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 mx-auto z-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-[30px] border-b-[1px] border-content-tertiary shadow-sm">
        <div
          className={`flex flex-row justify-between items-center transition-all w-[min(100%-2rem,1200px)] m-auto overflow-hidden ${
            isNavBarExpanded ? "h-[130px]" : "h-[61px]"
          }`}
        >
          <Logo expanded={isNavBarExpanded} />
          <NavLinks expanded={isNavBarExpanded} />
        </div>
      </div>
      <div style={{ height: 130 }}></div>
    </>
  );
}
