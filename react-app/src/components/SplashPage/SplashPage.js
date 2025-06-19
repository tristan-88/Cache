import "./SplashPage.css";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import DemoButton from "../DemoButton/DemoButton";

function SplashPage() {
  const history = useHistory();
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
            <NavLink to="/sign-up" className="signup-link">
              Sign-Up
            </NavLink>

            <NavLink to="/login" className="login-link">
              Log-In
              </NavLink>
              <DemoButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default SplashPage;
