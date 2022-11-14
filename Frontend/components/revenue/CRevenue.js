import React, { useEffect, useState } from "react";
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

export const dummyData = [
  {
    label: "Expected Revenue",
    data: [0, 0, 0, 0, 0, 0, 0],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
];

function CRevenue({ weekRevenue }) {
  const [dataset, setDataset] = useState(dummyData);
  useEffect(() => {
    setDataset([
      {
        label: "Expected Revenue",
        data: weekRevenue,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ]);
  }, [, weekRevenue]);
  return (
    <div>
      <Line options={options} data={{ labels: labels, datasets: dataset }} />
    </div>
  );
}

export default CRevenue;
