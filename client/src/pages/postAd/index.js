import React, { useState } from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";

//Components
import BasicDetails from "./BasicDetails";
import AdditionalDetails from "./AdditionalDetails";
import ContactDetails from "./ContactDetails";

import "./PostAd.scss";

function PostAd() {
  const { isLoggedIn, id } = useSelector((state) => state.user);

  const [uploadedImg, setUploadedImg] = useState({ file: null, preview: null });
  const [page, setPage] = useState(1);
  const [userInput, setUserInput] = useState({
    userId: id,
    make: "",
    model: "",
    year: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    trim: "",
    description: "",
    imageName: "",
    address: "",
    phone: "",
    price: "",
    vehicleCondition: "",
    color: "",
  });

  const updateUserInput = (inputField, value) => {
    setUserInput({ ...userInput, [inputField]: value });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  console.log(page);

  if (!isLoggedIn) {
    return <Redirect to="/signin" from="/post" />;
  }
  return (
    <div className="PostAd_Container elements_small_container">
      {page == 1 && (
        <BasicDetails
          nextPage={nextPage}
          updateUserInput={updateUserInput}
          userInput={userInput}
        />
      )}
      {page == 2 && (
        <AdditionalDetails
          nextPage={nextPage}
          previousPage={previousPage}
          updateUserInput={updateUserInput}
          userInput={userInput}
          uploadedImg={uploadedImg}
          setUploadedImg={setUploadedImg}
        />
      )}
      {page == 3 && (
        <ContactDetails
          previousPage={previousPage}
          updateUserInput={updateUserInput}
          uploadedImg={uploadedImg}
          userInput={userInput}
        />
      )}
    </div>
  );
}

export default PostAd;
