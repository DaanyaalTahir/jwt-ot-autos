import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Listing from "../../components/listing";

import "./ManageAds.scss";

function ManageAds() {
  const { id, username, email } = useSelector((state) => state.user);
  const [listings, setListings] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUserAds", {
        params: {
          userId: id,
        },
      })
      .then((res) => {
        console.log(res);
        setListings(res.data.listings);
      });
  }, []);

  const deleteListing = (listingId) => {
    axios
      .post("http://localhost:3001/deleteListing", { listingId, userId: id })
      .then((res) => {
        console.log(res);
        setListings(listings.filter((listing) => listing.id != listingId));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editListing = (listing) => {
    history.push("editAd", { ...listing });
  };

  return (
    <div className="elements_smaller_container Manage_Ads_Cont">
      <h2>My ads</h2>
      <div>
        {listings && listings.length != 0 ? (
          listings.map((listing) => {
            return (
              <Listing
                listing={{ ...listing, email, username }}
                editMode={true}
                deleteListing={deleteListing}
                editListing={editListing}
              />
            );
          })
        ) : (
          <div className="not_found_text">
            <h3>You have no active listings</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageAds;
