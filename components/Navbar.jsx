import {useEffect} from "react";
import Link from "next/link";
import { FaClinicMedical } from "react-icons/fa";
import { useStateContext } from "../context/StateContext";
const Navbar = () => {
  const { isLogged, logOut, userLogged} = useStateContext();
  userLogged()
  
  return (
    <div className="navbar">
      <Link href="/">
        <a className="navbar-logo">
          <FaClinicMedical />
        </a>
      </Link>
      {!isLogged && (
        <>
          <Link href="/signup">
            <a className="navbar-item">Sign up</a>
          </Link>
          <Link href="/">
            <a className="navbar-item">Sign in</a>
          </Link>
        </>
      )}
      {isLogged && (
        <>
          <Link href="/posts">
            <a className="navbar-item">Posts</a>
          </Link>
          <Link href="/profile">
            <a className="navbar-item">Profile</a>
          </Link>
          <Link href="/logout">
            <a className="navbar-item" onClick={logOut}>Log out</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
