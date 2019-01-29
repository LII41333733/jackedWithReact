import React from "react";

function Button(props) {

  let type;
  let typeIcon;

  if (props.type === "edit") {
    typeIcon = <i className="far fa-edit ml-2"></i>
  } else if (props.type === "start") {
    typeIcon = <i className="fas fa-dumbbell mt-1 ml-2"></i>
  } else if (props.type === "clear") {
    typeIcon = <i className="far fa-times-circle ml-2"></i>
  } else if (props.type === "delete") {
    typeIcon = <i className="far fa-trash-alt ml-2"></i>
  } else if (props.type === "changeDate") {
    typeIcon = <i className="far fa-calendar-alt"></i>
  } else if (props.type === "save") {
    typeIcon = <i className="far fa-save"></i>
  } else if (props.type === "saveBar clear") {
    typeIcon = <i className="far fa-save"></i>
  }  else if (props.type === "add start") {
    typeIcon = <i className="fas fa-plus-square ml-2"></i>
  }

  return (
    <div>
      <button onClick={props.onClick} type="button" className={`btn monda d-flex mx-auto mt-3 ${props.type} ${props.class}`}> 
        {props.buttonName} 
        {typeIcon}
      </button>
   </div>
  );
}

export default Button;

