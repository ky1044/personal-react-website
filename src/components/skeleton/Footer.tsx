import { useMemo } from "react";
import PrintersColorBlocks from "./PrintersColorBlocks";

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  const externalLinks: { label: string; href: string }[] = [
    {
      label: "Source code",
      href: "https://github.com/ky1044/personal-react-website",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 61;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="border-t border-layout-divider">
      <div className="max-w-[1200px] mx-auto p-4 pb-12 border-l border-r border-layout-divider backdrop-blur-[50px]">
        <div className="flex justify-between gap-10 items-baselie">
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 items-baseline">
              <p className="text-content-secondary text-lg font-bold">
                Ken Yokokawa
              </p>
              <p className="text-content-secondary text-sm">{year}</p>
            </div>
            <PrintersColorBlocks />
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <ul className="flex flex-col items-end">
              <li className="text-sm whitespace-pre-line text-right">
                Crafted with care,
                <br /> by hand and <br />
                with the help of AI
              </li>
              {externalLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-content-secondary no-underline hover:text-primary-blue transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
