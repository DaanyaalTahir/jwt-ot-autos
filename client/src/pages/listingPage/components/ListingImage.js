import React from "react";

function ListingImage({ imageName, userId, listingId }) {
  return (
    <div className="listing_image card_container">
      <img src={`http://localhost:3001/${userId}/${listingId}/${imageName}`} />
    </div>
  );
}

export default ListingImage;
