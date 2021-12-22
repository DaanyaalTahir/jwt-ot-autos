import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Listing from "../../components/listing";
import Search from "../../components/search";

import "./Results.scss";

function Results() {
  const history = useHistory();
  const location = useLocation();
  if (!location.state) history.push("/");
  const [listings, setListings] = useState(location.state.listings);
  const [searchedVals, setSearchedVals] = useState(location.state.searchVals);
  const title = setTitle(searchedVals);

  return (
    <div className="ResultsPage_Cont elements_medium_container">
      <h2>{title}</h2>
      <div className="results_page_content">
        <div className="search_cont">
          <Search
            setSearchResults={setListings}
            searchedVals={searchedVals}
            setSearchedVals={setSearchedVals}
            type={"compressed"}
          />
        </div>

        <div className="results_cont">
          {listings.length != 0 ? (
            listings.map((listing) => {
              return <Listing listing={listing} />;
            })
          ) : (
            <div className="not_found_text">
              <h3>No listings found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function setTitle(searchVals) {
  let title = "";

  if (searchVals.make != "" || searchVals.model != "") {
    title += searchVals.make != "" ? searchVals.make + " " : "";
    title += searchVals.model != "" ? searchVals.model + " " : "";
  } else {
    title = "Cars ";
  }
  title += "for sale";

  return title;
}

export default Results;
