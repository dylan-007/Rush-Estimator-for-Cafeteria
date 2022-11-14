import React, { useContext, useEffect } from "react";
import { Col, Row, Tabs, Tab, Nav } from "react-bootstrap";
import authContext from "../../hooks/AuthContext/authContext";
import dishContext from "../../hooks/DishContext/dishContext";
import AddFoodItem from "./AddFoodItem";
import Items from "./Items";
import SpecialDish from "./SpecialDish";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function Weekday() {
  const { user } = useContext(authContext);
  const { getDishes } = useContext(dishContext);
  useEffect(() => {
    if (user) {
      getDishes(user.restaurant_id);
    }
  }, [, user]);
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="Sunday">
      <Row>
        <Col md={3}>
          <Nav variant="pills" className="flex-column">
            {days.map((day, key) => (
              <Nav.Item key={key}>
                <Nav.Link eventKey={day}>{day}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col md={9}>
          <Tab.Content>
            {days.map((day, key) => (
              <Tab.Pane eventKey={day} key={key}>
                <SpecialDish day={day} />
              </Tab.Pane>
            ))}
            <Items />
            <AddFoodItem />
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default Weekday;
