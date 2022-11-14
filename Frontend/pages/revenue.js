import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PCards from "../components/footfall/PCards";
import CRevenue from "../components/revenue/CRevenue";
import authContext from "../hooks/AuthContext/authContext";
import dataContext from "../hooks/DataContext/dataContext";

function Revenue() {
  const { user } = useContext(authContext);
  const { weekRevenue, getWeekRevenue } = useContext(dataContext);
  useEffect(() => {
    if (!user) {
    } else {
      let date = new Date();
      date = date.toISOString().split("T")[0];
      let formData = {
        date: date,
        restaurantID: user.restaurent_id,
      };
      getWeekRevenue(formData);
    }
  }, [, user]);
  // console.log("week revenue: ", weekRevenue);
  return (
    <>
      <Container>
        <PCards />
        <h4 className="my-4">Predicting Current Weeks Revenue</h4>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <CRevenue weekRevenue={weekRevenue} />
          </Col>
          <Col md={2}></Col>
        </Row>
        {/* <Col md={2}></Col>
          <Col md={4}>
            <RadarRevenue weekRevenue={weekRevenue} />
          </Col>
        <h4 className="my-4">Past Week Predicted and Actual Revenue</h4>
        <PRevenue /> */}
      </Container>
    </>
  );
}

export default Revenue;
