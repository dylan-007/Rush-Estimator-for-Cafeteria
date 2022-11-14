import React from "react";
import { Card, Button } from "react-bootstrap";
import style from "./Home.module.css";

const data = [
  {
    id: 1,
    image: "assets/images/footfall.png",
    title: "Footfall Analysis",
    text: "Analyzing your cafeteria footfall has never been so easy. Thanks to our powerful Machine Learning Model and analytical tools, we bring it to your fingertips.",
    url: "",
  },
  {
    id: 2,
    image: "assets/images/revenue.png",
    title: "Revenue Prediction",
    text: "This tool can estimate the revenue of your cafeteria. It will help you to analyze your cafeteria's performance and to determine the feasibility of opening a new outlet.",
    url: "",
  },
  {
    id: 3,
    image: "assets/images/inventory.png",
    title: "Inventory Management",
    text: "Our very special feature is the inventory management system. Update your menu online for the coming week and predict how much raw materials need to be purchased to meet the demand.",
    url: "",
  },
];

function Services() {
  return (
    <div className="mb-5">
      <h2 className="d-flex justify-content-start my-2">Services We Provide</h2>
      <div className="row my-2 text-center">
        {data.map((item, key) => (
          <div className="col-md-4 col-sm-12 px-4" key={key}>
            <Card key={key} className={style.cardContainer}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="pb-4">{item.text}</Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
