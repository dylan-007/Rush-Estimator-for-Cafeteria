import React, { useContext, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import authContext from "../../hooks/AuthContext/authContext";
import dishContext from "../../hooks/DishContext/dishContext";
import AddItem from "./AddItem";
import style from "./menu.module.css";

function SpecialDish({ day }) {
  const { user } = useContext(authContext);
  const { specialDishes, addIngredients } = useContext(dishContext);
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  if (!specialDishes[day]) {
    return <div>No Special Items</div>;
  }

  const { dish_id, name, image, ingredients, price } = specialDishes[day];
  const handleSubmit = (formData) => {
    addIngredients(
      {
        dish_id: dish_id,
        ingredients: [formData],
      },
      user?.restaurant_id
    );
  };
  return (
    <div>
      <h3 className="px-3 mb-5">Special Item for {day}</h3>
      <Row className="px-5">
        <Col md={4} sm={12}>
          <img src={image} alt={name} className={style.cardimg} />
        </Col>
        <Col md={8} sm={12}>
          <div className="text-center">
            <h4 className={style.cardh4}>
              {name} - {"\u20B9"}
              {price}
            </h4>
            <div className="btn text-underline" onClick={handleOpen}>
              <u>Add Ingredient</u>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ingredient</th>
                  <th>Quantity (ml/gm)</th>
                </tr>
              </thead>
              <tbody>
                {ingredients &&
                  ingredients.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <AddItem
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default SpecialDish;
