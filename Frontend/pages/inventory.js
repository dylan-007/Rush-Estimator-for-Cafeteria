import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import QuantityGraph from "../components/fooditems/QuantityGraph";
import IngredintGraph from "../components/fooditems/IngredintGraph";
import IngredintsTable from "../components/fooditems/IngredintsTable";
import dishContext from "../hooks/DishContext/dishContext";
import authContext from "../hooks/AuthContext/authContext";
import Note from "../components/fooditems/Note";

function FoodItems() {
  const { ingredients, getIngredientsDay } = useContext(dishContext);
  const { user } = useContext(authContext);
  const labels = [];
  const values = [];
  useEffect(() => {
    if (!user) {
    } else {
      let date = new Date();
      date = date.toISOString().split("T")[0];
      let formData = {
        date: date,
        restaurantID: user.restaurent_id,
      };
      getIngredientsDay(formData);
    }
  }, [, user]);
  useEffect(() => {
    if (ingredients) {
      ingredients.forEach((ingredient) => {
        labels.push(ingredient.name);
        values.push(ingredient.quantity);
      });
    }
  }, [ingredients]);
  return (
    <>
      <Container>
        <Row>
          <Col md={8}>
            <h4 className="my-4">Ingredients Required Today</h4>
            <IngredintGraph labels={labels} values={values} />
          </Col>
          <Col md={4}>
            <h4 className="my-4">Ingredients Quantity Comparision</h4>
            <QuantityGraph labels={labels} values={values} />
          </Col>
        </Row>
        <Note />
        <Row>
          <Col md={7}>
            <h4 className="my-4">Ingredients</h4>
            <IngredintsTable ingredients={ingredients} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FoodItems;
