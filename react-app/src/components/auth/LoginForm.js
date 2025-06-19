import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory} from "react-router-dom";
import { login } from "../../store/session";
import "./FormStyle.css";
import { demoLogin } from "../../store/session";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

   const onClick = async (e) => {
        e.preventDefault()
        await dispatch(demoLogin())
        history.push("/main")

    }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sign-up-container">
      <div className="sign-up-form-container">
        <div className="form-style">
          <form onSubmit={onLogin} className="form-itself">
            <h1 className="sign-up-h1">Log In</h1>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="form-input"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="form-input"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              <button type="submit" className="signing-button">
                Login
              </button>
              <button className="log-in-demo" onClick={onClick}>Demo</button>
              <div className="text">
                {`Do not have account?`}{" "}
                <NavLink
                  to="/sign-up"
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  Sign Up
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
