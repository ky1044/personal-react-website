import { Carousel, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { OrbitSketch } from "src/components/p5/orbits/orbits";
import { P5Sketch } from "src/components/p5/starField/sketch";
import ProjectsSection from "src/components/projects/ProjectsSection";
import styled from "styled-components";

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    background: grey;
  }
  > .slick-dots li.slick-active button {
    background: dodgerblue;
  }
`;

function P({ value }: { value?: string }) {
  return <p className="flagRender">{value}</p>;
}

const HomePage = () => {
  return (
    <div>
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
            <OrbitSketch />
            <P5Sketch />
          </CarouselWrapper>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
