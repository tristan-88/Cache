import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
import ToolTip from "../ToolTip/ToolTip";

const NavBar = () => {
  const user = useSelector((state) =>
    state.session.user ? state.session.user : null
  );

  const userName = user.username
  const userEmail = user.email

  const contents = [userName, userEmail]
  
  
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
            <ToolTip contents={contents} />
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
              <i className="far fa-lightbulb"></i> Notes
            </NavLink>
          </div>
          <div className="archived-page">
            <NavLink to={`/archived`} exact={true} activeClassName="active">
              <i className="fas fa-archive"></i> Archived
            </NavLink>
          </div>
          <div className="log-out-button">
            <i className="fas fa-sign-out-alt"></i>
            <LogoutButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
