import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import {
  faUser,
  faLineChart,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authContext from "../../hooks/AuthContext/authContext";
import dataContext from "../../hooks/DataContext/dataContext";

const cardData = [
  {
    title: "Expected Customers today",
    value: "",
    comment: "",
  },
  {
    title: "Expected Revenue today(\u20B9)",
    value: "",
    comment: "",
  },
];

function PCards() {
  const [cardsData, setCardsData] = useState(cardData);
  const { user } = useContext(authContext);
  const {
    dayPrediction,
    dayRevenue,
    dayComment,
    dayRevenueComment,
    getDayPrediction,
    getDayRevenue,
  } = useContext(dataContext);

  const generateComment = (data) => {
    if (data == null) {
      return "Loading...";
    }
    if (data < 0) return data + " % less than yesterday";
    return "+" + data + " % more than yesterday";
  };
  useEffect(() => {
    if (!user) {
    } else {
      let date = new Date();
      date = date.toISOString().split("T")[0];
      let formData = {
        date: date,
        restaurantID: user.restaurent_id,
      };
      getDayPrediction(formData);
      getDayRevenue(formData);
    }
  }, [user]);

  useEffect(() => {
    setCardsData([
      {
        title: "Expected Customers today",
        value: dayPrediction,
        comment: generateComment(dayComment),
      },
      {
        title: "Expected Revenue today(\u20B9)",
        value: dayRevenue,
        comment: generateComment(dayRevenueComment),
      },
    ]);
  }, [dayPrediction, dayRevenue]);
  return (
    <>
      <div className="row my-2">
        {cardsData.map((item, i) => (
          <div className="col-md-4 my-2" key={i}>
            <PCard {...item} i={i} />
          </div>
        ))}
      </div>
    </>
  );
}

const PCard = ({ title, value, comment, i }) => (
  <Card>
    <Card.Body className="pb-0">
      <Row>
        <Col xs={4}>
          <FontAwesomeIcon
            icon={[faUser, faRupeeSign][i]}
            className="text-light p-2 my-0"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "fill",
              borderRadius: "10%",
              backgroundColor: ["darkviolet", "brown"][i],
            }}
          />
        </Col>
        <Col xs={8}>
          <div className="text-end">
            <h6 className="mb-2 text-muted">{title}</h6>
            <h4>{value}</h4>
          </div>
        </Col>
      </Row>
      <hr className="mb-0" />
      <p
        className=" m-0  py-2"
        style={{ color: comment[0] == "-" ? "red" : "green" }}
      >
        <FontAwesomeIcon
          icon={faLineChart}
          className="pe-4"
          style={{
            maxWidth: "15px",
            maxHeight: "15px",
          }}
        />
        {comment}
      </p>
    </Card.Body>
  </Card>
);

export default PCards;
