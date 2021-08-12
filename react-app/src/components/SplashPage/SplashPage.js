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
          <div>
            <h1>Welcome to Cache</h1>
          </div>
          <div className="splash-links">
            <div>
              <NavLink to="/sign-up" className="signup-link">
                Sign-Up
              </NavLink>
            </div>
            <div>
              <NavLink to="/login" className="login-link">
                Log-In
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SplashPage;
