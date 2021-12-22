import React from "react";
import { numberWithCommas } from "../../../global/generalFunctions";

function ListingHeading({ make, model, year, trim, price, listingId }) {
  return (
    <div className="card_container vehicle_heading">
      <div className="heading">
        <div className="title">
          {year} {make} {model} {trim}
        </div>

        <div className="listing_id">ID: {listingId}</div>
      </div>

      <div className="price">${numberWithCommas(price)}</div>
      <div></div>
    </div>
  );
}

export default ListingHeading;
