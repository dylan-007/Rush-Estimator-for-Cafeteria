import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CFootfall from "../components/footfall/CFootfall";
import PCards from "../components/footfall/PCards";
import PFootfall from "../components/footfall/PFootfall";
import RadarFootfall from "../components/footfall/RadarFootfall";
import authContext from "../hooks/AuthContext/authContext";
import dataContext from "../hooks/DataContext/dataContext";

function Footfall() {
  const { user } = useContext(authContext);
  const { weekPrediction, getWeekPrediction } = useContext(dataContext);
  useEffect(() => {
    if (!user) {
    } else {
      let date = new Date();
      date = date.toISOString().split("T")[0];
      let formData = {
        date: date,
        restaurantID: user.restaurent_id,
      };
      getWeekPrediction(formData);
    }
  }, [user]);
  return (
    <>
      <Container>
        <PCards />
        <h4 className="my-4">Predicting Current Weeks Footfall</h4>
        <Row>
          <Col md={8}>
            <CFootfall weekPrediction={weekPrediction} />
          </Col>
          <Col md={4}>
            <RadarFootfall weekPrediction={weekPrediction} />
          </Col>
        </Row>
        <h4 className="my-4">Past Week Predicted and Actual Footfall</h4>
        <PFootfall />
      </Container>
    </>
  );
}

export default Footfall;
