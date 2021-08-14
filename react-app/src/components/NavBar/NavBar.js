import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  const user = useSelector((state) =>
    state.session.user ? state.session.user : null
  );

  return (
    <nav className="nav-container">
      {!user && (
        <div className="nav-container">
          <div className="log-in-link">
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div className="sign-up-link">
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
      {user && (
        <div className="nav-container">
          <div className="user-profile">
            <NavLink
              to={`/users/${user.id}`}
              exact={true}
              activeClassName="active"
            >
              <img
                src={`${user.avatar_url}`}
                alt="avatar"
                className="avatar-img"
              />
            </NavLink>
          </div>
          <div className="notes-page">
            <NavLink to="/" exact={true} activeClassName="active">
              📝 Notes
            </NavLink>
          </div>
          <div className="archived-page">
            <NavLink to={`/archived`} exact={true} activeClassName="active">
              🗃 Archived
            </NavLink>
          </div>
          <div className="log-out-button">
            ❌<LogoutButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
