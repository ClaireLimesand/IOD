import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./RegisterForm.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

      dispatch({
        type: "REGISTER",
        payload: {
          username: username,
          password: password,
          email: email
        },
      });
  }; // end registerUser

  return (
    <div className="container">
      <center>
        <form id="formPanel" onSubmit={registerUser}>
          <img className="register-globe" src="globe.png" draggable={false} />
          <center id="register-text">INTERNSHIP ON DEMAND</center>
          <img className="register-gradient" src="gradient_bar.png" draggable={false} />
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <div className="register-inputs">
            <center>
              <label htmlFor="username">
                <input
                  className="register-password"
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>
              <label htmlFor="password">
                <input
                  className="register-password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <label htmlFor="email">
                <input
                  className="register-password"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
            </center>
          </div>
          <div className="register-main-button">
            <input className="register-button" type="submit" name="submit" value="Register" />
          </div>

          <center>
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </button>
          </center>
        </form>
      </center>
    </div>
  );
}

export default RegisterForm;
