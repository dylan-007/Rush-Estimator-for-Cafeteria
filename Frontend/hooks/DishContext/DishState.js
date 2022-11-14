import { useState } from "react";
import axiosClient from "./../../services/axios-client";
import DishContext from "./dishContext";
import { alertBox } from "../../utils";
import React from "react";

function DishState({ children }) {
  const [dishes, setDishes] = useState(null);
  const [specialDishes, setSpecialDishes] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const getDishes = async (restaurant_id) => {
    await axiosClient
      .get(`get-dishes?restaurant_id=${restaurant_id}`)
      .then(function (response) {
        const res = response.data;
        setDishes(res.other_dishes);
        setSpecialDishes(res.special_dishes);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addDish = async (formData, restaurant_id) => {
    await axiosClient
      .post("add-dish", formData)
      .then(function (response) {
        const res = response.data;
        alertBox(res.message, "success");
        getDishes(restaurant_id);
      })
      .catch(function (error) {
        alertBox();
        console.log(error);
      });
  };

  const addIngredients = async (formData, restaurant_id) => {
    await axiosClient
      .put("update-dish", formData)
      .then(function (response) {
        const res = response.data;
        alertBox(res.message, "success");
        getDishes(restaurant_id);
      })
      .catch(function (error) {
        alertBox();
        console.log(error);
      });
  };

  const getIngredientsDay = async (formData) => {
    await axiosClient
      .post("predict-ingridents-day", formData)
      .then(function (response) {
        const res = response.data;
        setIngredients(res.output);
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <DishContext.Provider
      value={{
        dishes,
        specialDishes,
        ingredients,
        addDish,
        addIngredients,
        getDishes,
        getIngredientsDay,
      }}
    >
      {children}
    </DishContext.Provider>
  );
}

export default DishState;
