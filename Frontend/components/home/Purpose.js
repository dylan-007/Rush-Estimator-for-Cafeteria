import React from "react";
import { Col, Row } from "react-bootstrap";
import style from "./Home.module.css";

function Purpose() {
  return (
    <>
      <Row>
        <Col md={6}>
          <h3 className="my-0">Purpose</h3>
          <h4 className="text-secondary my-0">Our Purpose</h4>
          <p className="">
            Estimating the number of people who will visit at a specific time is
            crucial when managing a cafeteria since we need to make the
            appropriate preparations for the rush. To produce good revenues and
            provide clients with ample food, estimations must be accurate. What
            if the estimate is incorrect? In which case the estimation is useless. If it is higher, whatever
            food is left will be ruined, resulting in money being squandered and
            having a negative social impact. Our proposed solution will tackle
            this issue by making accurate predictions and offering services to
            the restaurant which will curb food wastage .
          </p>
        </Col>
        <Col md={6}>
          <img
            src="/assets/images/purpose.png"
            alt="logo"
            className={style.aboutImage}
          />
        </Col>
      </Row>
    </>
  );
}

export default Purpose;
