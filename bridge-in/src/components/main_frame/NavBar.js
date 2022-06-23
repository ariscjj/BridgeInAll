import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { signInWithCustomToken, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "./NavBar.css";

function NavBar(props) {
  const [click, setClick] = useState(false);

  const [loading, setLoading] = useState(false);

  async function onLogoutClicked() {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  }

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Bridge-In
            <i className="fas fa-code"></i>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {props.user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/employeelist"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Employee List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/addemployee"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Add Employee
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/subsidiarylist"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Subsidiary List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/addsubsidiary"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Add Subsidiary
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn"
                    style={{ "border-color": "white", color: "white" }}
                    loading={loading}
                    onClick={onLogoutClicked}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/register"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
