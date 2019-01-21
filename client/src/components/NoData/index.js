import React from "react";

function NoData(props) {
  return (

    <div className="text-center">
      <h3 className="no-data"> You do not have any {props.category} data for today. </h3>
      <i className="fas fa-plus-square mt-2"></i>
    </div>



  );
}

export default NoData;
