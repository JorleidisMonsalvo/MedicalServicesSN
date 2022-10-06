import {useEffect} from "react";
import { useRouter } from "next/dist/client/router";
import logo from '../assets/bye.gif'

const logout = () => {
    
  return (
    <div className="login-container">
      <div className="logout-text">
        <h4>Thank you for visiting our website!</h4>
        <img src='https://i.gifer.com/origin/f9/f9cefa07e7fdb48d7eab95b7f29d8e4b_w200.gif' alt='This is a gif'/>
        </div>
    </div>
  );
};

export default logout;
