import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <div className="container">
      <form className="formPanel" onSubmit={login}>
        <center>
          <img className="login-globe" src="globe.png" />
          <center id="login-text">INTERNSHIP ON DEMAND</center>
          <img className="login-gradient" src="gradient_bar.png" />
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <div className="login-inputs">
            <div>
              <label htmlFor="username">
                <input
                  className="login-username"
                  placeholder="Username"
                  type="text"
                  name="username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <input
                  className="login-password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="login-main-button">
            <input
              className="login-button"
              type="submit"
              name="submit"
              value="Sign In"
            />
          </div>
          <center>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push("/registration");
              }}
            >
              Register
            </button>
          </center>
        </center>
      </form>
    </div>
  );
}

export default LoginForm;
