import { Carousel, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { OrbitSketch } from "src/components/p5/orbits/orbits";
import { P5Sketch } from "src/components/p5/starField/sketch";
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
      <h2>Recent Projects</h2>
      <Link to="https://github.com/ky1044/personal-react-website">
        <h3 className="logo">Personal Website</h3>
      </Link>
      <p>
        Personal website, built in React. {"It's"} a new project so there is a
        lot of work to do!
      </p>

      <Link to="https://github.com/ky1044/Bikeable">
        <h3 className="logo">Bikeable</h3>
      </Link>
      <p>
        website to find the current and past status of the nearest Citibike
        stations. Built in React and Flask.
      </p>

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
  );
};

export default HomePage;
