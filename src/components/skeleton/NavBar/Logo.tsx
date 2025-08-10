import React from "react";
import { Link } from "react-router-dom";

function Logo({ expanded }: { expanded: boolean }) {
  return (
    <header>
      <Link to="/">
        <h1
          className={`px-1 border-2 border-primary-blue text-primary-blue text-[22px] font-medium font-[Jost,Futura,Helvetica] no-underline tracking-[1.6px] transition-all overflow-hidden ${
            expanded ? "w-[65px] h-[103px]" : "w-[80px] h-[34px]"
          }`}
        >
          <div className="flex flex-row w-[200px]">
            <div
              className={`transition-all ${expanded ? "w-[65px]" : "w-[55px]"}`}
            >
              Ken{" "}
            </div>
            <div>Y</div>
          </div>
          <div>Yoko</div>
          <div>kawa</div>
        </h1>
      </Link>
    </header>
  );
}

export default Logo;
