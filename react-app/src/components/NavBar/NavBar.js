import React from "react";
import { NavLink, Redirect} from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import './NavBar.css'

const NavBar = () => {
  const user = useSelector((state) => state.session.user ? state.session.user: null);
 
  return (
    <nav className="nav-container">
      {!user && (
        <div className="nav-container">
          <div>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
      {user && (
        <div className="nav-container">
          <div>
            <NavLink to="/" exact={true} activeClassName="active">
             📝 Main
            </NavLink>
          </div>
          <div>
            <NavLink
              to={`/users/${user.id}`}
              exact={true}
              activeClassName="active"
            >
              👨‍👩‍👧‍👦 Users
            </NavLink>
          </div>
          <div>
            <NavLink to={`/archived`} exact={true} activeClassName="active">
              🗃 Archived
            </NavLink>
          </div>
          <div>
            ❌<LogoutButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
