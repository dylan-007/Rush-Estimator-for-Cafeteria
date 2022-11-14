import React, { useContext, useEffect, useState } from "react";
import authContext from "../hooks/AuthContext/authContext";
import { useRouter } from "next/router";

import { Col, Container, Row, Tabs, Tab } from "react-bootstrap";
import Login from "../components/signup/Login";
import Register from "../components/signup/Register";

function SignIn() {
  const router = useRouter();
  const { user } = useContext(authContext);

  if (user) {
    router.push("/");
  }
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div
                style={{ maxWidth: "512px" }}
                className="bg-white shadow-soft border rounded p-4 p-lg-5 w-100"
              >
                <div className="d-flex align-items-center justify-content-center">
                  <img width={48} src="/assets/images/logo.png" />
                  <h4 className="mx-2">IBM Dashboard</h4>
                </div>
                <Tabs
                  defaultActiveKey="login"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  fill
                >
                  <Tab eventKey="login" title="Login">
                    <Login />
                  </Tab>
                  <Tab eventKey="register" title="Register">
                    <Register />
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default SignIn;
