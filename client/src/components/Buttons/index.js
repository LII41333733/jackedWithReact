import React from "react";

function Button(props) {

  let type;
  let typeIcon;

  if (props.type === "edit") {
    type = "edit";
    typeIcon = <i className="far fa-edit ml-2"></i>
  } else {
    type = props.type;
    typeIcon = <i className="fas fa-save"></i>
  }

  return (
    <div>
      <button onClick={props.onClick} type="button" className={`btn btn-danger monda d-flex mx-auto mt-3 ${type}`}> 
        {props.buttonName} 
        {typeIcon}
      </button>
   </div>
  );
}

export default Button;

