import { Button, Modal, Table } from "react-bootstrap";
import React from "react";

function ViewItems({ show, handleClose, ingredients }) {
  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Ingredients
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Ingredient</th>
                <th>Quantity (ml/gm)</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((item, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewItems;
