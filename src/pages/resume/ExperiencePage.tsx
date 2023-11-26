import { Row } from "antd";
import { TextLink } from "src/components/shared/TextLink";
import { Footer } from "src/components/skeleton/Footer";
import { NavBar } from "src/components/skeleton/NavBar";
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
    <div className="body">
      <NavBar />

      <div className="top-level-container black">
        <div className="narrow-vertical-container">
          <Row
            align="middle"
            justify="space-between"
            style={{ marginBottom: 50 }}
          >
            <h1>EXPERIENCE</h1>
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
