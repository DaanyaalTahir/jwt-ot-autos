import React, { useState } from "react";
import Axios from "axios";

import "./EditAd.scss";

function AdditionalDetails({
  previousPage,
  userInput,
  updateUserInput,
  uploadedImg,
  setUploadedImg,
  nextPage,
}) {
  const canContinue = () => {
    return !(
      userInput.fuelType != "" &&
      userInput.transmission != "" &&
      userInput.trim != "" &&
      userInput.description != "" &&
      userInput.imageName != "" &&
      userInput.vehicleCondition != "" &&
      userInput.color != ""
    );
  };

  const onImgChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const formData = new FormData();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadedImg({ ...uploadedImg, preview: reader.result, file: file });
        updateUserInput("imageName", file.name);
      }
    };
    formData.append("userId", 1);
    formData.append("listingId", 2);
    formData.append("file", file);

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>Additional details</h2>

      <div className="input_field">
        <label htmlFor="fuel_type">Fuel type</label>
        <div className="input_cont">
          <select
            name="fuel_type"
            id="fuel_type"
            onChange={(e) => updateUserInput("fuelType", e.target.value)}
            value={userInput.fuelType}
          >
            <option value="" selected>
              Select Fuel Type
            </option>
            <option>Gas</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="transmission">Transmission</label>
        <div className="input_cont">
          <select
            name="transmission"
            id="transmission"
            onChange={(e) => updateUserInput("transmission", e.target.value)}
            value={userInput.transmission}
          >
            <option value="" selected>
              Select Transmission
            </option>
            <option>Manual</option>
            <option>Automatic</option>
          </select>
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="vehicleCondition">Condition</label>
        <div className="input_cont">
          <select
            name="vehicleCondition"
            id="vehicleCondition"
            onChange={(e) =>
              updateUserInput("vehicleCondition", e.target.value)
            }
            value={userInput.vehicleCondition}
          >
            <option value="" selected>
              Select Condition
            </option>
            <option>New</option>
            <option>Used</option>
          </select>
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="color">Color</label>
        <div className="input_cont">
          <input
            type="text"
            name="color"
            id="color"
            placeholder="e.g. Blue"
            onChange={(e) => updateUserInput("color", e.target.value)}
            value={userInput.color}
            required
          />
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="Trim">Trim</label>
        <div className="input_cont">
          <input
            type="text"
            name="Trim"
            id="Trim"
            placeholder="e.g. Lounge"
            onChange={(e) => updateUserInput("trim", e.target.value)}
            value={userInput.trim}
            required
          />
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="description">Description</label>
        <div className="input_cont">
          <textarea
            id="description"
            name="description"
            maxlength="500"
            required
            placeholder="Please provide a description of the vehicle."
            onChange={(e) => updateUserInput("description", e.target.value)}
            value={userInput.description}
          ></textarea>
        </div>
      </div>

      <div className="input_field">
        <label className="custom-file-upload ">
          <img
            src={`${
              uploadedImg.preview
                ? uploadedImg.preview
                : `http://localhost:3001/${userInput.userId}/${userInput.id}/${userInput.imageName}`
            } `}
          />
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            onChange={(e) => onImgChange(e)}
          />
        </label>
      </div>

      <div className="form_actions space_between">
        <button
          className="back_button"
          onClick={() => {
            previousPage();
          }}
        >
          Back
        </button>
        <button
          className="progress_button"
          onClick={() => nextPage()}
          disabled={canContinue()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default AdditionalDetails;
