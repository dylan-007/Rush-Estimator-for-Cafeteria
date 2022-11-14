import React from "react";
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

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Expected Data",
      data: [45, 24, 83, 82, 47, 54, 32],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Actual Data",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function PRevenue() {
  return (
    <div style={{ width: "80%" }}>
      <Bar options={options} data={data} />
    </div>
  );
}

export default PRevenue;
