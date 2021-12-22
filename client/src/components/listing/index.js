import React from "react";
import { numberWithCommas } from "../../global/generalFunctions";
import { useHistory } from "react-router-dom";

import "./Listing.scss";

function Listing({ listing, editMode = false, deleteListing, editListing }) {
  const history = useHistory();
  const openListing = () => {
    history.push("/listing", {
      ...listing,
    });
  };

  return (
    <div className="card_container Listing_Cont">
      <div onClick={() => openListing()}>
        <img
          src={
            listing.imageName
              ? `http://localhost:3001/${listing.userId}/${listing.id}/${listing.imageName}`
              : "./emptyImg.jpg"
          }
        />
      </div>
      <div className="listing_content">
        <div className="important_info" onClick={() => openListing()}>
          <div className="title">
            {listing.year} {listing.make} {listing.model} {listing.trim}
          </div>
          <div className="price">${numberWithCommas(listing.price)}</div>
        </div>

        <div className="listing_summary" onClick={() => openListing()}>
          <div>
            <span className="material-icons-outlined">speed</span>{" "}
            {numberWithCommas(listing.mileage)}&nbsp;km
          </div>
          <div>
            <span className="material-icons-outlined">local_gas_station</span>
            {listing.fuelType}
          </div>
          <div>
            <span className="material-icons-outlined">location_on</span>
            {listing.address}
          </div>
          <div>
            <span className="material-icons-outlined">settings</span>
            {listing.transmission}
          </div>
        </div>

        {editMode && (
          <div>
            <hr />
            <div className="listing_actions_cont">
              <div>ID: {listing.id}</div>
              <div className="actions">
                <div className="edit_btn" onClick={() => editListing(listing)}>
                  <span className="material-icons">edit</span>&nbsp;
                  <span className="text">Edit</span>
                </div>
                <div
                  className="delete_btn"
                  onClick={() => deleteListing(listing.id)}
                >
                  <span className="material-icons">delete</span>&nbsp;
                  <span className="text">Delete</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Listing;
