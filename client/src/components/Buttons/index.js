import React from "react";

function UpdateButton(props) {
  return (
<div>
   <button type="button" className="btn btn-danger monda update-button" onClick={() => {props.data}}>SAVE</button>
   </div>
  );
}

export default UpdateButton;
