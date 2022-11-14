import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row, Tabs, Tab, Nav } from "react-bootstrap";
import Weekday from "../components/menu/Weekdays";
import authContext from "../hooks/AuthContext/authContext";

function Menu() {
  const { user } = useContext(authContext);
  const router = useRouter();
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/sign-in");
  //   }
  // }, []);
  return (
    <>
      <Container>
        <h3>Restro Menu</h3>
        <Weekday />
      </Container>
    </>
  );
}

export default Menu;
