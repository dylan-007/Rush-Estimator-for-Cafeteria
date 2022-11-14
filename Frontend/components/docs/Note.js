import React from "react";
import style from "./Steps.module.css";
function Note() {
  return (
    <div className="my-5">
      <h6 className={style.special_note}>
        <u>Note</u>: Recommended to run for at least 3 months to get accurate
        predictions. If any interruptions in software runtime it can be resumed
        from that checkpoint.
      </h6>
    </div>
  );
}

export default Note;
