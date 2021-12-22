import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import UserOptions from "./UserOptions";

import "./GlobalNav.scss";

function GlobalNav({ size = "large" }) {
  const { isLoggedIn, username } = useSelector((state) => state.user);
  const [showUserOpt, setShowUserOpt] = useState(false);

  const history = useHistory();
  const location = useLocation().pathname;

  let containerSize = "";

  switch (size) {
    case "smaller":
      containerSize = "elements_small_container";
      break;
    case "small":
      containerSize = "elements_small_container";
      break;
    case "medium":
      containerSize = "elements_medium_container";
      break;
    case "large":
      containerSize = "elements_container";
      break;
  }

  return (
    <div className={`Nav_Container ${location !== "/" && "Simple_Nav"}`}>
      <div className={`nav_items ${containerSize}`}>
        <div className="company_name" onClick={() => history.push("/")}>
          OT <div className="name_2">Autos</div>
        </div>
        <div className="nav_options">
          {isLoggedIn ? (
            <div className="user_profile" onClick={() => setShowUserOpt(true)}>
              <span className="material-icons-outlined">account_circle</span>
              <button className="option">
                {username}
                <span className="material-icons">expand_more</span>
              </button>
              <div>
                {showUserOpt && (
                  <UserOptions
                    name={username}
                    setShowUserOpt={setShowUserOpt}
                  />
                )}
              </div>
            </div>
          ) : (
            <div>
              <button
                className="option"
                onClick={() => history.push("/signin")}
              >
                Sign in
              </button>
              <button
                className="option"
                onClick={() => history.push("/register")}
              >
                Register now
              </button>
            </div>
          )}
          {location != "/post" && (
            <button
              className="post_ad_btn"
              onClick={() => history.push("/post")}
            >
              Post ad
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalNav;
