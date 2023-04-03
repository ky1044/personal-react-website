import React from "react";
import { Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        borderBottom: ".5px lightgrey solid",
        marginTop: 6,
        marginBottom: 8,
      }}
    >
      <header>
        <Link to="./">
          <h1 className="logo">Ken Yokokawa</h1>
        </Link>
      </header>

      <Col>
        <Row>
          <Link to="./resume">
            <h2>Resume</h2>
          </Link>

          <Divider
            type="vertical"
            orientation="center"
            style={{ marginTop: "18px", height: "16px" }}
          />
          <Link to="./about">
            <h2>About</h2>
          </Link>
        </Row>
      </Col>
    </Row>
  );
}
