import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className={`form-group ${props.class}`} >
      <input type="text" data-indexnum={props.attr} className={`form-control ${props.width}`} name={props.name} onChange={props.onChange} value={props.value}/>
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control gymNotes" rows="10" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}
