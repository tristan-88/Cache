import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./FormStyle.css"

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sign-up-container">
      <div className="sign-up-form-container">
        <div className="form-style">
          
          <form onSubmit={onSignUp} className="form-itself">
            <h1 className="sign-up-h1">Sign Up</h1>
            <div>
              <label>User Name</label>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                className="form-input"
                placeholder="User Name"
              ></input>
            </div>
            <div>
              <label>Email</label>
              <input
                className="form-input"
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
                placeholder="Email"
              ></input>
            </div>
            <div>
              <label>Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                placeholder="Password"
              ></input>
            </div>
            <div>
              <label>Repeat Password</label>
              <input
                className="form-input"
                type="password"
                name="repeat_password"
                placeholder="Repeat Password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type="submit" className="signing-button">Sign Up</button>
            <div className="text">
              {`Already have an account? `}
              {" "}
              <NavLink to="/login" style={{textDecoration:"none", color:"blue", cursor:"pointer"}}> Log In</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
