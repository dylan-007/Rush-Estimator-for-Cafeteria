import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import dishContext from "../../hooks/DishContext/dishContext";
import authContext from "../../hooks/AuthContext/authContext";
import { uploadFilesToCloud } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const days = [
  { name: "None", value: "" },
  { name: "Monday", value: "Monday" },
  { name: "Tuesday", value: "Tuesday" },
  { name: "Wednesday", value: "Wednesday" },
  { name: "Thursday", value: "Thursday" },
  { name: "Friday", value: "Friday" },
  { name: "Saturday", value: "Saturday" },
  { name: "Sunday", value: "Sunday" },
];
const initData = {
  name: "",
  image: "",
  price: "",
  speciality: "",
};
function AddFoodItem() {
  const { user } = useContext(authContext);
  const { addDish } = useContext(dishContext);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initData);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [imageFile, setImageFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    formData["restaurant_id"] = user?.restaurent_id;
    addDish(formData, user?.restaurent_id);
    setFormData(initData);
    setImageFile(null);
    handleClose();
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (files) => {
    setImageFile(files[0]);
  };

  useEffect(() => {
    if (imageFile) {
      setImageLoading(true);
      uploadFilesToCloud(imageFile)
        .then((data) => {
          setFormData({ ...formData, image: data.data.secure_url });
        })
        .finally(() => {
          setImageLoading(false);
        });
    }
  }, [imageFile]);

  const canSubmit =
    formData.name.length > 0 &&
    formData.price.length > 0 &&
    formData.image.length > 0;
  return (
    <div className="mb-5">
      <Button onClick={handleOpen}>Add Dish</Button>
      <Modal
        size="md"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Add Dish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Dish Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dish Name"
                name="name"
                onChange={handleChange}
                required
                // value={formData.name}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="image"
                type="text"
                placeholder="Image Url"
                onChange={handleChange}
                required

                // value={formData.image}
              />
            </Form.Group> */}
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files)}
                  />
                </Col>
                {imageLoading && (
                  <Col xs={1}>
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                  </Col>
                )}
              </Row>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Speciality</Form.Label>
                  <Form.Select
                    name="speciality"
                    onChange={handleChange}
                    // value={formData.speciality}
                  >
                    <option>--Speciality for --</option>
                    {days.map((day, id) => (
                      <option value={day.value} key={id}>
                        {day.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price in Rupee"
                    name="price"
                    onChange={handleChange}
                    value={formData.price}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <Button
                onClick={handleSave}
                className="btn-primary"
                type="submit"
                disabled={!canSubmit}
              >
                Add
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddFoodItem;
