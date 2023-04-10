import resume from "./resume.json";

import { Divider, Row } from "antd";
import { Button } from "src/components/shared/shared";
import { NavBar } from "src/components/nav/NavBar";

const ResumePage = () => {
  // Function will execute on click of button
  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch("resume.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "Ken Yokokawa Resume.pdf";
        alink.click();
      });
    });
  };
  return (
    <div className="page">
      <div className="body">
        <NavBar />

        <div className="top-level-container white">
          <Row align="middle" justify="space-between" style={{ marginBottom: 50 }}>
            <h1>Resume</h1>
            <Button
              type="Secondary"
              text="Download PDF"
              onClick={onButtonClick}
            />
          </Row>

          <h2>Work Experience</h2>
          <Divider style={{ borderColor: "white" }} />
          {resume.work_experience.map((job, index) => (
            <div key={index}>
              <Row justify="space-between">
                <h3>{job.title}</h3>
                <h3>{job.duration}</h3>
              </Row>
              <Row justify="space-between">
                <h3>{job.company}</h3>
                <h3>{job.location}</h3>
              </Row>

              <ul>
                {job.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2>Education</h2>
          <Divider style={{ borderColor: "white" }} />
          {resume.education.map((education, index) => (
            <div key={index}>
              <Row justify="space-between">
                <h3>{education.institution}</h3>
                <h3>{education.duration}</h3>
              </Row>
              <Row justify="end">
                <h3>{education.location}</h3>
              </Row>
              <ul>
                <li>{education.degree}</li>
                <li>{education.additional_info}</li>
                <li>GPA: {education.gpa}</li>
              </ul>
            </div>
          ))}
          <h2>Additional Info</h2>
          <Divider style={{ borderColor: "white" }} />
          <ul>
            {resume.additional_information.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
