import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import React, { useState } from "react";

const initData = {
  name: "",
  quantity: "",
};

function AddItem({ show, handleClose, handleSubmit }) {
  const [formData, setFormData] = useState(initData);
  const handleSave = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData(initData);
    handleClose();
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const canSubmit = formData.name.length > 0 && formData.quantity.length > 0;
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ingredient</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Ingredient"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity (ml/gm)</Form.Label>
              <Form.Control
                name="quantity"
                type="number"
                placeholder="Quantity in ml/gm"
                value={formData.quantity}
                onChange={handleChange}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
                  <Form.Label>Cost</Form.Label>
                  <Form.Control
                    name="cost_per_unit"
                    type="number"
                    placeholder="Cost per Unit"
                    value={formData.cost_per_unit}
                    onChange={handleChange}
                  />
                </Form.Group> */}

            <div className="text-end">
              <Button
                onClick={handleSave}
                className="btn-primary"
                type="submit"
                disabled={!canSubmit}
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddItem;
