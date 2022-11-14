import Image from "next/image";
import React from "react";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import style from "../../styles/Banner.module.css";

const Banner = ({ props }) => {
  return (
    <>
      <div className={style.headerImg}></div>
      <Row>
        <Col>
          <div className={style.jumbotronContainer}>
            <h2 className="display-4 font-weight-bold">
              Join us and help us Fight
            </h2>
            <hr className="my-2" />
            <h1 className="display-3 font-weight-bold">Food Waste!</h1>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Banner;
