import "./SplashPage.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function SplashPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  if (user === null) {
    history.push("/");
  }
  return (
      <div className="splash-container">
        {user ? (
          <Redirect to="/main" />
        ) : (
          <div className="title-access">
            <h1>Welcome to Cache</h1>
          </div>
        )}
      </div>
  );
}

export default SplashPage;
