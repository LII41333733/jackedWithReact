import React from "react";

function Button(props) {

  let type;
  let typeIcon;

  if (props.type === "edit") {
    typeIcon = <i className="far fa-edit ml-2"></i>
  } else if (props.type === "start") {
    typeIcon = <i className="fas fa-dumbbell mt-1 ml-2"></i>
  } else if (props.type === "clear") {
    typeIcon = <i class="far fa-times-circle"></i>
  } else if (props.type === "delete") {
    typeIcon = <i class="far fa-trash-alt"></i>
  } else if (props.type === "changeDate") {
    typeIcon = <i class="far fa-calendar-alt"></i>
  }

  return (
    <div>
      <button onClick={props.onClick} type="button" className={`btn monda d-flex mx-auto mt-3 ${props.type}`}> 
        {props.buttonName} 
        {typeIcon}
      </button>
   </div>
  );
}

export default Button;

