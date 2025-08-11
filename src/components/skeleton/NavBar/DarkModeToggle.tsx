import { useEffect } from "react";
import { MoonIcon, SunIcon } from "src/icons/Icons";
import { useDarkMode } from "src/providers/DarkModeProvider";

function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  return (
    <div
      className="flex flex-row cursor-pointer gap-1.5"
      onClick={() => setIsDarkMode((prev) => !prev)}
    >
      <p className="text-sm">{isDarkMode ? "Dark" : "Light"} mode</p>
      <div className="w-5 h-5 cursor-pointer relative">
        <div
          className={`w-5 h-[46px] flex flex-col justify-center items-center absolute gap-1.5 transition-transform duration-200 bottom-0 gap-[6px] ${
            isDarkMode ? "translate-y-[25px]" : "translate-y-0"
          }`}
        >
          <MoonIcon size={18} />
          <SunIcon size={20} />
        </div>
      </div>
    </div>
  );
}

export default DarkModeToggle;
