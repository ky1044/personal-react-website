import { Row } from "antd";
import { TextLink } from "src/components/shared/TextLink";
import { Footer } from "src/components/skeleton/Footer";
import { NavBar } from "src/components/skeleton/NavBar/NavBar";
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
    <div className="max-w-[1200px] mx-auto mt-12 px-4 pb-20 leading-snug">
      <NavBar />

      <div className="max-w-[1200px] mx-auto mt-12 px-4">
        <div className="flex flex-col justify-between gap-2.5 max-w-[820px] mx-auto">
          <Row
            align="middle"
            justify="space-between"
            style={{ marginBottom: 50 }}
          >
            <h1 className="text-primary-blue">EXPERIENCE</h1>
            <TextLink
              text="Download Resume"
              linkType="download"
              onClick={onButtonClick}
            />
          </Row>

          <ResumeSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExperiencePage;
