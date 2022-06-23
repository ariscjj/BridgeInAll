import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

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
