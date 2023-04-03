import resume from "./resume.json";

import { Row } from "antd";

const ResumePage = () => {
  return (
    <div>
      <h2>Work Experience</h2>
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
      {resume.education.map((education, index) => (
        <div key={index}>
          <Row justify="space-between">
            <h3>{education.institution}</h3>
            <h3>{education.duration}</h3>
          </Row>
          <Row justify="space-between">
            <h3>{education.company}</h3>
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
  );
};

export default ResumePage;
