import React from "react";

function ContactDetails({ previousPage, updateUserInput, userInput, onSave }) {
  const canContinue = () => {
    return !(userInput.address != "" && userInput.phone != "");
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
          onClick={onSave}
          disabled={canContinue()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ContactDetails;
