import { useMemo } from "react";
import PrintersColorBlocks from "./PrintersColorBlocks";
import { useLocation } from "react-router-dom";

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  const internalLinks: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Experience", href: "/experience" },
    { label: "About", href: "/about" },
    {
      label: "Source code",
      href: "https://github.com/ky1044/personal-react-website",
    },
  ];
  const location = useLocation();

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
            <h4 className="text-content-secondary text-sm">Sitemap</h4>
            <ul className="flex flex-col">
              {internalLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`text-xs no-underline hover:text-primary-blue transition-colors ${
                      location.pathname === l.href
                        ? "text-primary-blue"
                        : "text-content-primary"
                    }`}
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
