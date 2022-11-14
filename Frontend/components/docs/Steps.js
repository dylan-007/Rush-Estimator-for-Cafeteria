import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import authContext from "../../hooks/AuthContext/authContext";
import { alertBox } from "../../utils";

function Steps() {
  const { user } = useContext(authContext);
  const handleClick = (e) => {
    navigator.clipboard.writeText(user?.restaurent_id);
    alertBox(`Copied ${user?.restaurent_id}`, "success");
  };
  const steps = [
    {
      title: "Link Account",
      description: "Create an account and copy your restaurant id",
      link: "",
      link_name: "Copy ID",
      icon: "/assets/images/link.png",
      download: (
        <div>
          <div className="btn text-primary" onClick={handleClick}>
            <u>Copy Id</u>
          </div>
        </div>
      ),
    },
    {
      title: "Download",
      description: "Download the software and run the .exe file",
      icon: "/assets/images/download.png",
      download: (
        <div>
          <a
            href={
              "https://drive.google.com/u/0/uc?id=1dlJitJy-aWwAH4BlCYftSFBghFCgA7Rt&export=download"
            }
            target="_blank"
            rel="noreferrer"
          >
            {"Download"}
          </a>
        </div>
      ),
    },
    {
      title: "Connect to your IP camera",
      description: "Enter your IP camera's details and restaurant ID",
      link: "",
      link_name: "Copy ID",
      icon: "/assets/images/camera.jpeg",
      download: <div></div>,
    },
  ];
  return (
    <div className="my-5">
      <Row>
        {steps.map((step, index) => (
          <Col md={4} key={index}>
            <div className="text-center">
              <img
                src={step.icon}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "auto",
                  borderRadius: "50%",
                }}
              />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {step.download}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Steps;
