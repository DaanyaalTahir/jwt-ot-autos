import React from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import api from "../../global/api";
function ContactDetails({
  previousPage,
  updateUserInput,
  userInput,
  uploadedImg,
}) {
  const canContinue = () => {
    return !(userInput.address != "" && userInput.phone != "");
  };
  const history = useHistory();

  const onSubmit = async () => {
    const formData = new FormData();
    var listingId = null;

    console.log(userInput);

    await api
      .post("http://localhost:3001/postAd", userInput)
      .then((response) => {
        console.log(response);
        listingId = response.data.listingId;
      })
      .catch((err) => {
        console.log({ ...err });
      });

    if (listingId) {
      formData.append("userId", userInput.userId);
      formData.append("listingId", listingId);
      formData.append("file", uploadedImg.file);

      await api
        .post("http://localhost:3003/saveImage", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log({ ...err });
        });

      history.push("/manageAds");
    }
  };
  return (
    <div>
      <h2>Contact details</h2>

      <div className="input_field">
        <label htmlFor="address">Address</label>
        <div className="input_cont">
          <input
            id="address"
            name="address"
            required
            placeholder="Enter an address"
            onChange={(e) => updateUserInput("address", e.target.value)}
            value={userInput.address}
          />
        </div>
      </div>

      <div className="input_field">
        <label htmlFor="phone">Phone number</label>
        <div className="input_cont">
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{10}"
            required
            placeholder="Enter a phone number"
            onChange={(e) => updateUserInput("phone", e.target.value)}
            value={userInput.phone}
          />
        </div>
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
          onClick={onSubmit}
          disabled={canContinue()}
        >
          Post Ad
        </button>
      </div>
    </div>
  );
}

export default ContactDetails;
