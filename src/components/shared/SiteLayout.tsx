import React, { PropsWithChildren } from "react";
import { NavBar } from "src/components/skeleton/NavBar/NavBar";
import { Footer } from "src/components/skeleton/Footer";
import GridReveal from "src/components/shared/GridReveal";

type SiteLayoutProps = PropsWithChildren<{
  className?: string;
}>;

const SiteLayout = ({ children, className }: SiteLayoutProps) => {
  return (
    <div
      className={`relative overflow-hidden bg-background-site z-[1] min-w-[360px] ${
        className ?? ""
      }`}
    >
      {/* Content wrapper above the grid */}
      <div className="relative z-10">
        <NavBar />
        {children}
        <Footer />
      </div>
      {/* Grid sits behind and scrolls with the page */}
      <div className="absolute inset-0 z-0">
        <GridReveal />
      </div>
    </div>
  );
};

export default SiteLayout;
