import React from "react";
import Head from "next/head";
import Script from "next/script";
import { Container } from "react-bootstrap";
import About from "../components/home/About";
import Purpose from "../components/home/Purpose";
import Services from "../components/home/Services";

function HomePage() {
  return (
    <>
      <Script src="/static/scripts.js"></Script>
      <Container>
        <About />
        <div className="my-5"></div>
        <Purpose />
        <hr className="my-5" />
        <Services />
      </Container>
    </>
  );
}

export default HomePage;
