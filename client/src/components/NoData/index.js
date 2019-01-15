import React from "react";

function NoData(props) {
  return (

    <div className="text-center">
      <h3 className="no-data"> You do not have any {props.category} data. </h3>
      <i class="fas fa-plus-square mt-3"></i>
    </div>



  );
}

export default NoData;
