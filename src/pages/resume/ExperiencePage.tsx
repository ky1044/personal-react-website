import { TextLink } from "src/components/shared/TextLink";
import ResumeSection from "./ResumeSection";

const ExperiencePage = () => {
  const onButtonClick = () => {
    fetch("resume.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Ken Yokokawa Resume.pdf";
        alink.click();
      });
    });
  };
  return (
    <>
      <div className="max-w-[1200px] mx-auto border-l border-r border-layout-divider">
        <div className="flex flex-row justify-between items-end px-4 pt-24">
          <h1 className="text-primary-blue">EXPERIENCE</h1>
          <div className="relative pb-4">
            <h1 className="text-background-site leading-none md:block hidden">
              経験
            </h1>
            <div className="md:absolute md:inset-0 md:flex md:items-end md:justify-end pb-4">
              <TextLink
                text="Download Resume"
                linkType="download"
                onClick={onButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[910px] mx-auto border-l border-r border-layout-divider">
        <div className="w-screen border-t border-layout-divider relative left-1/2 -translate-x-1/2" />
        <div className="px-4 py-8 max-w-[820px] mx-auto">
          <ResumeSection />
        </div>
      </div>
    </>
  );
};

export default ExperiencePage;
