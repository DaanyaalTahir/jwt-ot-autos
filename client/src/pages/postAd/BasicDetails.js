import React from "react";

import "./PostAd.scss";

function BasicDetails({ nextPage, updateUserInput, userInput }) {
  const canContinue = () => {
    return !(
      userInput.make != "" &&
      userInput.model != "" &&
      userInput.year != "" &&
      userInput.mileage != "" &&
      userInput.price != ""
    );
  };

  return (
    <div>
      <h2>Basic car details</h2>

      <div className="input_field">
        <label htmlFor="make">Make</label>
        <div className="input_cont">
          <input
            type="text"
            name="make"
            id="make"
            value={userInput.make}
            placeholder="e.g. Toyota"
            onChange={(e) => updateUserInput("make", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="model">Model</label>
        <div className="input_cont">
          <input
            type="text"
            name="model"
            id="model"
            placeholder="e.g. Corolla"
            value={userInput.model}
            onChange={(e) => updateUserInput("model", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="year">Year</label>
        <div className="input_cont">
          <input
            type="number"
            min="1900"
            max="2099"
            name="year"
            id="year"
            placeholder="e.g. 2020"
            value={userInput.year}
            onChange={(e) => updateUserInput("year", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="mileage">Current mileage in kilometres</label>
        <div className="input_cont">
          <input
            type="number"
            name="mileage"
            id="mileage"
            min="0"
            placeholder="e.g. 100 000"
            value={userInput.mileage}
            onChange={(e) => updateUserInput("mileage", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="price">Asking price</label>
        <div className="input_cont">
          <input
            type="number"
            name="price"
            id="price"
            min="0"
            placeholder="e.g. $10 000"
            value={userInput.price}
            onChange={(e) => updateUserInput("price", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form_actions end">
        <button
          className="progress_button"
          onClick={() => {
            nextPage();
          }}
          disabled={canContinue()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default BasicDetails;
