import React, { useState } from "react";
import { Redirect, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import api from "../../global/api";
//Components
import BasicDetails from "./BasicDetails";
import AdditionalDetails from "./AdditionalDetails";
import ContactDetails from "./ContactDetails";

import "./EditAd.scss";

function EditAd() {
  const { isLoggedIn, id } = useSelector((state) => state.user);
  const location = useLocation();

  const previousUserInput = { ...location.state };
  const history = useHistory();

  const [uploadedImg, setUploadedImg] = useState({ file: null, preview: null });
  const [page, setPage] = useState(1);
  const [userInput, setUserInput] = useState(previousUserInput);

  const updateUserInput = (inputField, value) => {
    setUserInput({ ...userInput, [inputField]: value });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const onSave = async () => {
    const formData = new FormData();
    var body = { id: userInput.id };
    var setVal = "";
    for (const property in userInput) {
      if (userInput[property] != previousUserInput[property]) {
        // console.log(Object.keys(userInput)[Object.keys(userInput).length - 1]);

        setVal += `${property} = '${userInput[property]}', `;
        body[property] = userInput[property];
      }
    }

    if (Object.keys(body).length > 1) {
      await api
        .post("http://localhost:3001/editAd", body)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log({ ...err });
        });

      if (body.imageName) {
        formData.append("userId", userInput.userId);
        formData.append("listingId", userInput.id);
        formData.append("previousImg", previousUserInput.imageName);
        formData.append("file", uploadedImg.file);

        await api
          .post("http://localhost:3001/editImage", formData, {
            "Content-Type": "multipart/form-data",
          })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log({ ...err });
          });
      }
    }

    history.push("/manageAds");
  };

  if (!isLoggedIn || !previousUserInput) {
    return <Redirect to="/" from="/editAd" />;
  }
  return (
    <div className="EditAd_Container elements_small_container">
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
          userInput={userInput}
          onSave={onSave}
        />
      )}
    </div>
  );
}

export default EditAd;
