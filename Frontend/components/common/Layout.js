import React from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import PageNavbar from "./PageNavbar";

function Layout({ children }) {
  return (
    <div className="layout-container">
      <div className="main">
        <PageNavbar />
        <Banner />
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
