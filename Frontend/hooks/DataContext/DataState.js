import { useEffect, useState } from "react";
import axiosClient from "./../../services/axios-client";
import DataContext from "./dataContext";

function DataState({ children }) {
  const [dayPrediction, setDayPrediction] = useState(null);
  const [dayRevenue, setDayRevenue] = useState(null);
  const [weekPrediction, setWeekPrediction] = useState([]);
  const [weekRevenue, setWeekRevenue] = useState([]);
  const [actualFootfall, setActual] = useState([]);
  const [predictedFootfall, setPredicted] = useState([]);
  const [dayComment, setDayComment] = useState(null);
  const [dayRevenueComment, setDayRevenueComment] = useState(null);

  // day footfall prediction
  const getDayPrediction = async (formData) => {
    // console.log("day Prediction");
    // console.log(formData);
    await axiosClient
      .post("predict/day", formData)
      .then(function (response) {
        const res = response.data;
        setDayPrediction(res.prediction);
        setDayComment(res.comment);
        // console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // week footfall prediction
  const getWeekPrediction = async (formData) => {
    // console.log("Week Prediction");
    await axiosClient
      .post("predict/week", formData)
      .then(function (response) {
        const res = response.data;
        setWeekPrediction(res.prediction);
        // console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDayRevenue = async (formData) => {
    console.log("day revenue");
    await axiosClient
      .post("predict-revenue-day", formData)
      .then(function (response) {
        const res = response.data;
        console.log(res);
        setDayRevenue(res.revenue);
        setDayRevenueComment(res.comment);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getHistoryFootfall = async (formData) => {
    await axiosClient
      .post("history-footfall", formData)
      .then(function (response) {
        const res = response.data;
        setActual(res.actual);
        setPredicted(res.predicted);
        // console.log(res);
      })
      .catch(function (error) {
        console.log("error");
        // console.log(error);
      });
  };

  const getWeekRevenue = async (formData) => {
    await axiosClient
      .post("predict-revenue-week", formData)
      .then(function (response) {
        const res = response.data;
        setWeekRevenue(res.week_revenue);
        // console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <DataContext.Provider
      value={{
        dayPrediction,
        weekPrediction,
        actualFootfall,
        dayComment,
        dayRevenueComment,
        dayRevenue,
        weekRevenue,
        predictedFootfall,
        getDayPrediction,
        getWeekPrediction,
        getHistoryFootfall,
        getDayRevenue,
        getWeekRevenue,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataState;
