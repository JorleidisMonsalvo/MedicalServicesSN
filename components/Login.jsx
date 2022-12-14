import { useState} from "react";
import { useStateContext } from "../context/StateContext";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const { login } = useStateContext()

  const handleSubmit = async () => {
    await login(loginInfo)
  };

  const handleChange = (e) => {
    setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to Medical Services!</h1>
        <span>Log In</span>
        <label className="form-item">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Insert your email address"
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>
        <button className="form-item" onClick={handleSubmit}>
          Log In!
        </button>
      </div>
    </div>
  );
};

export default Login;
