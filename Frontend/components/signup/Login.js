import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUnlockAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import authContext from "../../hooks/AuthContext/authContext";

const initData = {
  email: "",
  password: "",
};

function Login() {
  const { login } = useContext(authContext);
  const [formData, setFormData] = useState(initData);
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const canSubmit =
    formData.email.length > 0 && formData.password.length > 0 && !loading;
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      e.target.reset();
      await login(formData);
      setFormData(initData);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group id="email" className="mb-4">
          <Form.Label>Your Email</Form.Label>
          <InputGroup>
            <InputGroup.Text className="px-2">
              <FontAwesomeIcon icon={faEnvelope} style={{ width: "15px" }} />
            </InputGroup.Text>
            <Form.Control
              autoFocus
              required
              name="email"
              type="email"
              placeholder="example@company.com"
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group id="password" className="mb-4">
          <Form.Label>Your Password</Form.Label>

          <InputGroup>
            <InputGroup.Text className="px-2">
              <FontAwesomeIcon icon={faUnlockAlt} style={{ width: "15px" }} />
            </InputGroup.Text>
            <Form.Control
              required
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Row>
          <Col>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!canSubmit}
            >
              Login
            </Button>
          </Col>
          {loading && (
            <Col xs={1}>
              <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
}

export default Login;
