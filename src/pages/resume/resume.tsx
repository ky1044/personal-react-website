import resume from "./resume.json";

import { Divider, Row } from "antd";
import { NavBar } from "src/components/nav/NavBar";

const ResumePage = () => {
  return (
    <div className="page">
      <div className="body">
        <NavBar />

        <div className="top-level-container white">
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
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
