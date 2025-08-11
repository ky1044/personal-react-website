import React from "react";

const CyclingSvg = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M56 81L43.5 36" stroke="#0085FF" />
      <circle cx="31" cy="79" r="22.5" stroke="#0085FF" />
      <circle
        cx="56"
        cy="81"
        r="6.5"
        transform="rotate(180 56 81)"
        stroke="#0085FF"
      />
      <circle cx="98" cy="79" r="22.5" stroke="#0085FF" />
      <path d="M48 51L30.5 79.5L56 81L84.5 48.5L48 51Z" stroke="#0085FF" />
      <path d="M82.5 40.5L97.5 79" stroke="#0085FF" />
      <path
        d="M82 40.5C82 40.5 92 40.5 96 40.5C100 40.5 101.5 37.5 101.5 37.5"
        stroke="#0085FF"
      />
      <path d="M37.5 36H53" stroke="#0085FF" />
    </svg>
  );
};

export default CyclingSvg;
