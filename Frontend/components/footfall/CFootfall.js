import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { labels } from "../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

export const dummydata = [
  {
    label: "Expected Footfall",
    data: [0, 0, 0, 0, 0, 0, 0],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
];

function CFootfall({ weekPrediction }) {
  const [dataset, setDataset] = useState(dummydata);
  useEffect(() => {
    setDataset([
      {
        label: "Expected Footfall",
        data: weekPrediction,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ]);
  }, [, weekPrediction]);

  return (
    <div style={{ width: "80%" }}>
      <Line
        options={options}
        data={{
          labels: labels,
          datasets: dataset,
        }}
      />
    </div>
  );
}

export default CFootfall;
