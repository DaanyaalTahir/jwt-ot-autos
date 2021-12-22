import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import ListingImage from "./components/ListingImage";
import ListingHeading from "./components/ListingHeading";
import ListingStats from "./components/ListingStats";
import ListingDescription from "./components/ListingDescription";
import ContactInfo from "./components/ContactInfo";

import "./ListingPage.scss";

function ListingPage() {
  const location = useLocation();
  const history = useHistory();
  const listing = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ListingPage_Cont elements_medium_container">
      <div className="go_back_btn" onClick={() => history.goBack()}>
        <span className="material-icons">west</span> Go back to previous page
      </div>
      <div className="page_content">
        <div className="vehicle_info">
          <ListingImage
            imageName={listing.imageName}
            userId={listing.userId}
            listingId={listing.id}
          />
          <ListingHeading
            make={listing.make}
            model={listing.model}
            year={listing.year}
            trim={listing.trim}
            price={listing.price}
            listingId={listing.id}
          />
          <ListingStats
            trim={listing.trim}
            fuelType={listing.fuelType}
            mileage={listing.mileage}
            transmission={listing.transmission}
            vehicleCondtion={listing.vehicleCondition}
            color={listing.color}
          />
          <ListingDescription description={listing.description} />
        </div>

        <div className="contact_info_cont">
          <ContactInfo
            name={listing.username}
            phoneNumber={listing.phone}
            email={listing.email}
            address={listing.address}
          />
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
