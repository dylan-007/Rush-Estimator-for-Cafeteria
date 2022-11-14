import { useContext, useEffect, useState } from "react";
import style from "./menu.module.css";
import { Card } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ViewItems from "./ViewItems";
import dishContext from "../../hooks/DishContext/dishContext";
import AddItem from "./AddItem";
import authContext from "../../hooks/AuthContext/authContext";

function Items() {
  const { dishes, addIngredients } = useContext(dishContext);
  const { user } = useContext(authContext);
  const [show, setShow] = useState(false);
  const [activeIngredients, setActiveIngredients] = useState([]);
  const [activeDishid, setActiveDishid] = useState(null);
  const handleViewIngridents = (ingredients) => {
    setActiveIngredients(ingredients);
    setShow(true);
  };
  const handleSubmit = (formData) => {
    addIngredients(
      {
        dish_id: activeDishid,
        ingredients: [formData],
      },
      user?.restaurent_id
    );
  };
  const handleClose = () => {
    setActiveIngredients([]);
    setShow(false);
  };

  const [showEdit, setShowEdit] = useState(false);
  const handleEditOpen = (dish_id) => {
    setActiveDishid(dish_id);
    setShowEdit(true);
  };
  const handleEditClose = () => setShowEdit(false);
  return (
    <>
      <h3 className="px-3 my-5">Other Items</h3>

      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "5rem",
          breakpoints: {
            767: {
              perPage: 2,
            },
            640: {
              perPage: 1,
            },
          },
        }}
      >
        {dishes &&
          dishes.map(({ dish_id, name, image, ingredients, price }, id) => (
            <SplideSlide key={id}>
              <div className={style.mainDiv}>
                <img
                  src={image}
                  alt={name}
                  className={style.cardimg}
                  onClick={() => handleViewIngridents(ingredients)}
                />
                <div className={style.cardh4}>
                  {name} - {"\u20B9"}
                  {price}
                  <br />
                  <div
                    className="btn text-underline"
                    onClick={() => handleEditOpen(dish_id)}
                  >
                    <u>Add Ingredient</u>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
      </Splide>
      <ViewItems
        show={show}
        handleClose={handleClose}
        ingredients={activeIngredients}
      />
      <AddItem
        show={showEdit}
        handleClose={handleEditClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Items;
