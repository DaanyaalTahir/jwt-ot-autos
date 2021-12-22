import React from "react";

function ContactInfo({ name, phoneNumber, email, address }) {
  return (
    <div className="contact_info card_container">
      <div className="card_title">{name}</div>
      <div className="contact">
        <span className="material-icons">location_on</span>
        {address}
      </div>
      <div className="contact">
        <span className="material-icons">phone</span>
        <a href={`tel:+${phoneNumber}`}>{phoneNumber}</a>
      </div>
      <div className="contact">
        <span className="material-icons">email</span>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  );
}

export default ContactInfo;
