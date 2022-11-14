import React from "react";
import style from "./FoodItems.module.css";
function Note() {
  return (
    <div className="my-3 d-flex justify-content-center">
      <h6 className={style.special_note}>
        <u>Note</u>: All Ingredients mentioned here are measured in ml/gm.
      </h6>
    </div>
  );
}

export default Note;
