import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import authContext from "../../hooks/AuthContext/authContext";
import dataContext from "../../hooks/DataContext/dataContext";
import { Row, Col, Table } from "react-bootstrap";
import { labels } from "../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

export const dummyData = [
  {
    label: "Expected Data",
    data: [0, 0, 0, 0, 0, 0, 0],
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    label: "Actual Data",
    data: [0, 0, 0, 0, 0, 0, 0],
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
];

function PFootfall() {
  const [dataset, setDataset] = useState(dummyData);
  const { user } = useContext(authContext);
  const { actualFootfall, predictedFootfall, getHistoryFootfall } =
    useContext(dataContext);

  useEffect(() => {
    if (!user) {
    } else {
      let formData = {
        restaurantID: user.restaurent_id,
      };
      getHistoryFootfall(formData);
    }
  }, [user]);

  useEffect(() => {
    setDataset([
      {
        label: "Expected Data",
        data: actualFootfall,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Actual Data",
        data: predictedFootfall,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ]);
  }, [, actualFootfall, predictedFootfall]);

  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "80%" }}>
            <Bar
              options={options}
              data={{
                labels: labels,
                datasets: dataset,
              }}
            />
          </div>
        </Col>
        <Col md={4}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Day</th>
                <th>Footfall Expected</th>
                <th>Actual Footall</th>
              </tr>
            </thead>
            <tbody>
              {labels.map((label, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{label}</td>
                  <td>{predictedFootfall[key]}</td>
                  <td>{actualFootfall[key]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default PFootfall;
