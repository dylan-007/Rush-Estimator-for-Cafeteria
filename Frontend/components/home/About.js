import React from "react";
import { Col, Row } from "react-bootstrap";
import style from "./Home.module.css";
function About() {
  return (
    <>
      <h2 className="d-flex justify-content-start my-2">About Us</h2>
      <Row>
        <Col md={6}>
          <img
            src="/assets/images/aboutus.jpeg"
            alt="logo"
            className={style.aboutImage}
          />
        </Col>
        <Col md={6}>
          <h3 className="my-0">Overview</h3>
          <h4 className="text-secondary my-0">Our Vision</h4>
          <p className="">
            The food waste generated from restaurants in India which is
            around 67 million metric tonnes of food waste per annum which is
            valued at INR 92,000 crore growing at 8–10% per year is a serious
            the issue which needs to be solved. We are proposing a solution
            which will help cafeterias prepare the right amount of food to
            meet the demand. We will be estimating the number of people
            visiting the restaurant on the given day and providing the
            restaurant information on how much raw materials to buy and
            food to prepare so that there is no food shortage or wastage.
          </p>
        </Col>
      </Row>
    </>
  );
}

export default About;
