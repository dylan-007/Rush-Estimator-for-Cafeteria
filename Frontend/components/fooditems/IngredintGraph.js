import React, { useEffect, useState } from "react";
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
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      //   text: "Ingridents Required",
    },
  },
};

export const dummydata = [
  {
    label: "Ingridents Needed",
    data: [0],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
];

function IngredintGraph({ labels, values }) {
  const [dataset, setDataset] = useState(dummydata);
  useEffect(() => {
    setDataset([
      {
        label: "Ingridents Needed",
        data: values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ]);
  }, [, values, labels]);

  return (
    <div style={{ width: "80%" }}>
      <Bar
        options={options}
        data={{
          labels: labels,
          datasets: dataset,
        }}
      />
    </div>
  );
}

export default IngredintGraph;
