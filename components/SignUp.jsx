import React from "react";
import { useStateContext } from "../context/StateContext";

const SignUp = () => {
  const businessOptions = ["Pharmacy", "Laboratory", "Medical Service"];
  const signUp = useStateContext()
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to Medical Services!</h1>
        <span>Sign Up</span>
        <label className="form-item">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Insert your name"
          />
        </label>
        <label className="form-item">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Insert your email address"
          />
        </label>
        <label className="form-item">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Insert a password"
            min="6"
          />
        </label>
        <label className="form-item">
          Type of business:
          <select name="business" id="business">
            {businessOptions.map((el, i) => (
              <option value={el} key={i}>{el}</option>
            ))}
          </select>
        </label>
        <button className="form-item" onClick={handleSubmit}>
          Sign up!
        </button>
      </div>
    </div>
  );
};

export default SignUp;
