import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const dummyData = [
  {
    label: "Expected Revenue",
    data: [0, 0, 0, 0, 0, 0, 0],
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
  },
];

function RadarRevenue({ weekRevenue }) {
  const [dataset, setDataset] = useState(dummyData);
  useEffect(() => {
    setDataset([
      {
        label: "Expected Revenue",
        data: weekRevenue,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ]);
  }, [, weekRevenue]);
  return (
    <div style={{ width: "80%" }}>
      <Radar data={{ labels: labels, datasets: dataset }} />
    </div>
  );
}

export default RadarRevenue;
