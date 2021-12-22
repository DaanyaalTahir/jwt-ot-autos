import React, { useEffect, useRef } from "react";
import { userSignOut } from "../../state/actions/userActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function UserOptions({ name, setShowUserOpt }) {
  const node = useRef();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      setShowUserOpt(false);
      return;
    }
  };

  return (
    <div className="nav_dropdown" ref={node}>
      <div
        className="dropdown_option"
        onClick={() => {
          setShowUserOpt(false);
          history.push("/manageAds");
        }}
      >
        <span className="material-icons-outlined">manage_search</span>
        Manage ads
      </div>
      <hr />
      <div
        className="dropdown_option"
        onClick={() => {
          dispatch(userSignOut());
          history.push("/");
        }}
      >
        <span className="material-icons-outlined">key</span>Sign Out
      </div>
    </div>
  );
}

export default UserOptions;
