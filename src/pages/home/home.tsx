import { Carousel } from "antd";
import { NavBar } from "src/components/nav/NavBar";
import ColorfulDonut from "src/components/p5/donut/donut";
import { OrbitSketch } from "src/components/p5/orbits/orbits";
import { P5Sketch } from "src/components/p5/starField/sketch";
import ProjectsSection from "src/components/projects/ProjectsSection";
import styled from "styled-components";
import { ReactComponent as Splash } from "./splash.svg";

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    background: grey;
  }
  > .slick-dots li.slick-active button {
    background: dodgerblue;
  }
`;

const HomePage = () => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <Splash />
      </div>
      <NavBar />
      <div className="top-level-container">
        <ProjectsSection />
      </div>
      <div className="top-level-container">
        <h2>Recent Sketches</h2>
        <div>
          <CarouselWrapper
            style={{
              paddingBottom: 50,
            }}
          >
            <ColorfulDonut />
            <OrbitSketch />
            <P5Sketch />
          </CarouselWrapper>
        </div>
      </div>
    </>
  );
};

export default HomePage;
