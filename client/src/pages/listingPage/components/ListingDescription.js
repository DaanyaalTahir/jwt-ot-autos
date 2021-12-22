import React from "react";

function ListingDescription({ description }) {
  return (
    <div className="vehicle_description card_container">
      <div className="card_title">Description</div>

      <div>{description}</div>
    </div>
  );
}

export default ListingDescription;
