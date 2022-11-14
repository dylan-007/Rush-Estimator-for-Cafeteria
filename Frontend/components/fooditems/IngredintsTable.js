import React from "react";
import { Table } from "react-bootstrap";
import { sentenceCase } from "../../utils";
const data = [
  {
    id: 1,
    name: "Chilli",
    quantity: 10,
  },
  {
    id: 2,
    name: "Onion",
    quantity: 20,
  },
  {
    id: 3,
    name: "Tomato",
    quantity: 30,
  },
  {
    id: 4,
    name: "Garlic",
    quantity: 40,
  },
  {
    id: 5,
    name: "Ginger",
    quantity: 50,
  },
  {
    id: 6,
    name: "Salt",
    quantity: 60,
  },
  {
    id: 7,
    name: "Pepper",
    quantity: 70,
  },
];
function IngredentsTable({ ingredients }) {
  return (
    <div className="mb-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ingredient Name</th>
            <th>Quantity Expected (ml/gm)</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{sentenceCase(item.name)}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default IngredentsTable;
