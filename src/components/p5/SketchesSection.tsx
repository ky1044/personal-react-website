import { Carousel } from "antd";

import ColorfulDonut from "src/components/p5/donut/donut";
import { OrbitSketch } from "src/components/p5/orbits/orbits";
import { P5Sketch } from "src/components/p5/starField/sketch";
import styled from "styled-components";

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    background: black;
  }
  > .slick-dots li.slick-active button {
    background: white;
  }
`;

const SketchesSection = () => {
  return (
    <div className="vertical-container">
      <h2 className="white">Recent p5.js Sketches</h2>
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
  );
};

export default SketchesSection;
