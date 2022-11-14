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
import { labels } from "../../utils";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const dummyData = [
  {
    label: "Expected Footfall",
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
  },
];

function RadarFootfall({ weekPrediction }) {
  const [dataset, setDataset] = useState(dummyData);
  useEffect(() => {
    setDataset([
      {
        label: "Expected Footfall",
        data: weekPrediction,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
    ]);
  }, [, weekPrediction]);
  return (
    <div style={{ width: "80%" }}>
      <Radar
        data={{
          labels: labels,
          datasets: dataset,
        }}
      />
    </div>
  );
}

export default RadarFootfall;
