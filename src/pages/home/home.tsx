import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { NavBar } from "src/components/nav/NavBar";
import ColorfulDonut from "src/components/p5/donut/donut";
import { OrbitSketch } from "src/components/p5/orbits/orbits";
import { P5Sketch } from "src/components/p5/starField/sketch";
import ProjectsSection from "src/components/projects/ProjectsSection";
import styled from "styled-components";

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    background: black;
  }
  > .slick-dots li.slick-active button {
    background: white;
  }
`;

const SplashSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          backgroundColor: "white",
          zIndex: -1,
        }}
      />
      <div>
        <img className={`splash-background ${isScrolled ? "large " : ""}`} src="splash/splashBackground.svg" alt="splash image background"/>

      </div>
      <div style={{ height: "100vh" }}>
        <img className="splash" src="splash/splash.svg" alt="splash image"/>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <SplashSection />

      <div className="body">
        <NavBar />
        <div className="top-level-container">
          <ProjectsSection />
        </div>
        <div className="top-level-container">
          <h1 className="white">Recent Sketches</h1>
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
      </div>
    </>
  );
};

export default HomePage;
