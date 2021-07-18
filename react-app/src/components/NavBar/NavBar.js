import React from "react";
import { NavLink, Redirect} from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
 
  return (
    <nav>
      {!user && (
        <React.Fragment>
          <div>
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </div>
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
          
        </React.Fragment>
      )}
      {user && (
        <ul>
          <li>
            <NavLink
              to={`/users/${user.id}`}
              exact={true}
              activeClassName="active"
            >
              Users
            </NavLink>
          </li>
        <li>
          <LogoutButton />
        </li>
      </ul> 
      )}
      
    </nav>
  );
};

export default NavBar;
