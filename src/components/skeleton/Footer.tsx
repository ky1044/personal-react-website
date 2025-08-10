import { Col, Row } from "antd";
import { useMemo } from "react";
import PrintersColorBlocks from "./PrintersColorBlocks";
import DotsSection from "src/pages/home/DotsSection";

export function Footer() {
  const year = useMemo(() => {
    const today = new Date();
    return today.getFullYear();
  }, []);

  return (
    <>
      <div id="nav-bar" className="relative overflow-hidden mt-[100px]">
        <div>
          <DotsSection />
        </div>
        <div className="absolute z-[1] bottom-0 left-0 right-0 w-full">
          <div className="flex justify-end w-[min(100vw-40px,1200px)] m-auto">
            <div className="mb-4 p-1 bg-background-primary">
              <p className="text-center text-content-secondary">
                Ken Yokokawa {year}
              </p>
              <PrintersColorBlocks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
