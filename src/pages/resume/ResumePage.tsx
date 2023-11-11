import { Row } from "antd";
import { TextLink } from "src/components/shared/TextLink";
import { Footer } from "src/components/skeleton/Footer";
import { NavBar } from "src/components/skeleton/NavBar";
import ResumeSection from "./ResumeSection";

const ResumePage = () => {
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
        <div className="vertical-container">
          <Row
            align="middle"
            justify="space-between"
            style={{ marginBottom: 50 }}
          >
            <h1>RESUME</h1>
            <TextLink
              text="Download PDF"
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

export default ResumePage;
