import React, { useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Search.scss";

function Search({
  searchedVals = null,
  setSearchResults = null,
  type = null,
  setSearchedVals = null,
}) {
  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useSelector((state) => state.user);

  const [searchTerms, setSearchTerms] = useState(
    searchedVals
      ? searchedVals
      : { make: "", model: "", price: "", mileage: "" }
  );

  const onSearch = () => {
    var params = {};
    for (const property in searchTerms) {
      if (searchTerms[property] != "") {
        params[property] = searchTerms[property];
      }
    }

    axios
      .get("http://localhost:3001/search", {
        params: { ...params, ...(id && { userId: id }) },
      })
      .then((res) => {
        console.log(res);

        if (pathname == "/") {
          history.push("results", {
            listings: res.data.listings,
            searchVals: searchTerms,
          });
        } else {
          setSearchResults(res.data.listings);
          setSearchedVals(searchTerms);
        }
      });
  };

  return (
    <div
      className={`Search_Cont ${type == "compressed" ? "small_search" : ""}`}
    >
      <div className="search_header">Find your next car</div>
      <div className="search_inputs">
        <div className="input_cont">
          <input
            type="text"
            name="make"
            id="make"
            value={searchTerms.make}
            placeholder="Any make"
            onChange={(e) =>
              setSearchTerms({ ...searchTerms, make: e.target.value })
            }
            required
          />
        </div>

        <div className="input_cont">
          <input
            type="text"
            name="model"
            id="model"
            value={searchTerms.model}
            placeholder="Any model"
            onChange={(e) =>
              setSearchTerms({ ...searchTerms, model: e.target.value })
            }
            required
          />
        </div>

        <div className="grouped_inputs">
          <div className="input_cont">
            <span className="material-icons-outlined">paid</span>
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              value={searchTerms.price}
              placeholder="Max price"
              onChange={(e) =>
                setSearchTerms({ ...searchTerms, price: e.target.value })
              }
              required
            />
          </div>

          <div className="input_cont">
            <span className="material-icons">speed</span>
            <input
              type="number"
              name="maxMilleage"
              id="maxMilleage"
              value={searchTerms.mileage}
              placeholder="Max km"
              onChange={(e) =>
                setSearchTerms({ ...searchTerms, mileage: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="search_btn" onClick={() => onSearch()}>
          Search
        </div>
      </div>
    </div>
  );
}

export default Search;
