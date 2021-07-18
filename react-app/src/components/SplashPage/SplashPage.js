import "./SplashPage.css";
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";

function SplashPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  return (
    <div>
      {user ? (
        <Redirect to="/main" />
      ) : (
        <div className="splash Container">
          <h1>Welcome to Cache</h1>
        </div>
      )}
    </div>
  );
}

export default SplashPage;
